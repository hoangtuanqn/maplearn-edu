<?php

$finder = PhpCsFixer\Finder::create()
    ->in([
        __DIR__ . '/app',
        __DIR__ . '/bootstrap',
        __DIR__ . '/config',
        __DIR__ . '/database',
        __DIR__ . '/routes',
        __DIR__ . '/tests',
    ])
    ->name('*.php')
    ->ignoreDotFiles(true)
    ->ignoreVCS(true);

return (new PhpCsFixer\Config())
    ->setRiskyAllowed(true)
    ->setRules([
        'no_unused_imports' => true,           // <<< XÓA import thừa
        'ordered_imports' => true,             // Sắp xếp import
        'single_import_per_statement' => true,
        'no_extra_blank_lines' => true,
        'binary_operator_spaces' => ['default' => 'align_single_space_minimal'],
        'array_syntax' => ['syntax' => 'short'],
        'trailing_comma_in_multiline' => true,
        'method_argument_space' => ['on_multiline' => 'ensure_fully_multiline'],
        'no_trailing_whitespace' => true,
        'no_whitespace_in_blank_line' => true,
        'blank_line_after_namespace' => true,
        'blank_line_after_opening_tag' => true,
        'declare_strict_types' => false,
        'strict_param' => false,
        'phpdoc_trim' => true,
    ])
    ->setFinder($finder);
