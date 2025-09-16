<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class CheckImports extends Command
{
    protected $signature   = 'code:check-imports {--fix : Tự động xoá/sửa import thừa} {--path=* : Thư mục/file cụ thể để check}';
    protected $description = 'Kiểm tra (và tùy chọn sửa) các import thừa và import lỗi trong codebase';

    public function handle(): int
    {
        $this->info('🔍 Checking imports...');

        $paths = $this->option('path');
        if (empty($paths)) {
            $paths = ['app', 'database', 'routes', 'tests', 'config', 'bootstrap'];
        }

        $phpCsFixer = [PHP_BINARY, 'vendor/bin/php-cs-fixer'];
        $phpStan    = [PHP_BINARY, 'vendor/bin/phpstan'];

        // 1) PHP-CS-Fixer: chỉ báo lỗi khi --fix không bật, còn nếu có --fix thì sửa luôn.
        $this->line('');
        $this->info('➡️  PHP-CS-Fixer: ' . ($this->option('fix') ? 'fix mode' : 'dry-run mode'));
        $fixerArgs = array_merge(
            $phpCsFixer,
            $this->option('fix')
                ? ['fix', '--allow-risky=yes']
                : ['fix', '--dry-run', '--diff', '--allow-risky=yes']
        );

        $fixerProcess = new Process(array_merge($fixerArgs, ['--config=.php-cs-fixer.php']));
        $fixerProcess->setTimeout(null);
        $exitFixer = $this->runAndStream($fixerProcess);

        // 2) PHPStan: phân tích static để phát hiện import/class sai
        $this->line('');
        $this->info('➡️  PHPStan: static analysis');
        $stanArgs = array_merge($phpStan, ['analyse', '--configuration=phpstan.neon']);
        $stanArgs = array_merge($stanArgs, $paths);

        $stanProcess = new Process($stanArgs);
        $stanProcess->setTimeout(null);
        $exitStan = $this->runAndStream($stanProcess);

        $this->line('');
        if ($exitFixer === 0 && $exitStan === 0) {
            $this->info('✅ Done. Không phát hiện vấn đề nghiêm trọng.');
            return Command::SUCCESS;
        }

        $this->warn('⚠️ Có vấn đề cần xem lại (xem log phía trên).');
        return Command::FAILURE;
    }

    private function runAndStream(Process $process): int
    {
        $process->run(function ($type, $buffer) {
            echo $buffer;
        });
        return $process->getExitCode() ?? 1;
    }
}
