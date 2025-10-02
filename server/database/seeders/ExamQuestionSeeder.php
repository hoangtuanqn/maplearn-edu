<?php

namespace Database\Seeders;

use App\Models\ExamPaper;
use App\Models\ExamQuestion;
use Illuminate\Database\Seeder;

class ExamQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            // Câu 1: SINGLE_CHOICE
            [
                'content'       => 'Xét ba mệnh đề: \( A \): "Nếu trời mưa, tôi ở nhà", \( B \): "Trời mưa", \( C \): "Tôi ở nhà". Mệnh đề nào luôn đúng bất kể giá trị chân lý của \( A \), \( B \), và \( C \)?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( A \land B \implies C \)", 'is_correct' => true],
                    ['content' => "\( B \land C \implies A \)", 'is_correct' => false],
                    ['content' => "\( A \lor B \implies C \)", 'is_correct' => false],
                    ['content' => "\( A \land C \implies B \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Mệnh đề \( A \): \( B \implies C \). Nếu \( A \) và \( B \) đúng, thì \( C \) phải đúng để \( B \implies C \) đúng. Do đó, \( A \land B \implies C \) luôn đúng theo luật logic suy ra.',
            ],
            // Câu 2: MULTIPLE_CHOICE
            [
                'content'       => 'Chọn các mệnh đề đúng về số nguyên \( n \).',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "Nếu \( n \) chia hết cho 6 thì \( n \) chia hết cho 2", 'is_correct' => true],
                    ['content' => "Mọi số nguyên tố đều lớn hơn 1", 'is_correct' => true],
                    ['content' => "Có số nguyên \( n \) sao cho \( n^2 \) là số lẻ", 'is_correct' => true],
                    ['content' => "Mọi số chẵn đều là số nguyên tố", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Mệnh đề 1 đúng vì 6 chia hết cho 2. Mệnh đề 2 đúng vì số nguyên tố lớn hơn 1. Mệnh đề 3 đúng vì \( n = 3 \implies n^2 = 9 \) lẻ. Mệnh đề 4 sai vì 4 chẵn nhưng không phải số nguyên tố.',
            ],
            // Câu 3: TRUE_FALSE
            [
                'content'       => 'Mệnh đề: "Nếu \( x \) là số thực và \( x > 2 \), thì \( x^2 > 4 \)" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Hàm \( f(x) = x^2 \) tăng trên \( (2, +\infty) \), nên nếu \( x > 2 \), thì \( x^2 > 4 \). Mệnh đề luôn đúng.',
            ],
            // Câu 4: DRAG_DROP
            [
                'content'       => 'Cho \( P \): "Hôm nay là thứ Ba", \( Q \): "Tôi đi học". Giá trị của \( P \implies Q \) khi \( P \) sai và \( Q \) đúng là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                    ['content' => "Không xác định", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{false}, Q = \text{true} \): \( P \implies Q = \neg P \lor Q = \text{true} \lor \text{true} = \text{true} \).',
            ],
            // Câu 5: SINGLE_CHOICE
            [
                'content'       => 'Phủ định của mệnh đề: "Mọi số nguyên \( n \) chia hết cho 10 thì chia hết cho 5" là gì?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "Có số nguyên \( n \) chia hết cho 10 nhưng không chia hết cho 5", 'is_correct' => true],
                    ['content' => "Mọi số nguyên \( n \) chia hết cho 5 thì chia hết cho 10", 'is_correct' => false],
                    ['content' => "Có số nguyên \( n \) chia hết cho 5 nhưng không chia hết cho 10", 'is_correct' => false],
                    ['content' => "Mọi số nguyên \( n \) không chia hết cho 10 thì không chia hết cho 5", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Phủ định của \( \forall x (P(x) \implies Q(x)) \) là \( \exists x (P(x) \land \neg Q(x)) \). Ở đây, \( P(n) \): \( n \) chia hết cho 10, \( Q(n) \): \( n \) chia hết cho 5.',
            ],
            // Câu 6: MULTIPLE_CHOICE
            [
                'content'       => 'Chọn các mệnh đề đúng về hình học.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "Mọi hình vuông đều là hình thoi", 'is_correct' => true],
                    ['content' => "Mọi hình thoi đều là hình vuông", 'is_correct' => false],
                    ['content' => "Có hình thoi không phải là hình vuông", 'is_correct' => true],
                    ['content' => "Nếu một hình là hình thoi thì nó có bốn cạnh bằng nhau", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => 'Hình vuông là trường hợp đặc biệt của hình thoi, nhưng ngược lại thì không. Hình thoi có bốn cạnh bằng nhau.',
            ],
            // Câu 7: TRUE_FALSE
            [
                'content'       => 'Mệnh đề: "Nếu \( x^2 = 16 \), thì \( x = 4 \)" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Sai", 'is_correct' => true],
                    ['content' => "Đúng", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( x^2 = 16 \implies x = 4 \) hoặc \( x = -4 \), nên mệnh đề sai vì không xét \( x = -4 \).',
            ],
            // Câu 8: DRAG_DROP
            [
                'content'       => 'Cho \( A \): "Tôi học toán", \( B \): "Tôi hiểu bài". Giá trị của \( \neg (A \land B) \) khi \( A \) đúng và \( B \) sai là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( A = \text{true}, B = \text{false} \): \( A \land B = \text{false}, \neg (A \land B) = \text{true} \).',
            ],
            // Câu 9: SINGLE_CHOICE
            [
                'content'       => 'Mệnh đề nào tương đương với \( P \implies Q \), trong đó \( P \): "Tôi nỗ lực", \( Q \): "Tôi đạt được mục tiêu"?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( \neg Q \implies \neg P \)", 'is_correct' => true],
                    ['content' => "\( P \land Q \)", 'is_correct' => false],
                    ['content' => "\( P \lor Q \)", 'is_correct' => false],
                    ['content' => "\( \neg P \land \neg Q \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P \implies Q \) tương đương với \( \neg Q \implies \neg P \) (đối đảo).',
            ],
            // Câu 10: MULTIPLE_CHOICE
            [
                'content'       => 'Chọn các mệnh đề đúng khi \( P \): "Hôm nay là thứ Tư", \( Q \): "Tôi làm việc", \( R \): "Tôi bận rộn", và \( P \) sai, \( Q \) đúng, \( R \) sai.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "\( \neg P \)", 'is_correct' => true],
                    ['content' => "\( Q \lor R \)", 'is_correct' => true],
                    ['content' => "\( P \land Q \)", 'is_correct' => false],
                    ['content' => "\( R \implies Q \)", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{false}, Q = \text{true}, R = \text{false} \): \( \neg P = \text{true}, Q \lor R = \text{true}, P \land Q = \text{false}, R \implies Q = \text{true} \).',
            ],
            // Câu 11: TRUE_FALSE
            [
                'content'       => 'Mệnh đề: "Mọi số thực \( x \) đều thỏa mãn \( x^2 + 1 > 0 \)" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( x^2 + 1 \geq 1 > 0 \) với mọi \( x \) thực, nên mệnh đề đúng.',
            ],
            // Câu 12: DRAG_DROP
            [
                'content'       => 'Cho \( D \): "Tôi đi ngủ sớm", \( E \): "Tôi thức dậy sớm". Giá trị của \( (D \lor E) \land \neg D \) khi \( D \) sai và \( E \) đúng là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( D = \text{false}, E = \text{true} \): \( (D \lor E) \land \neg D = (\text{false} \lor \text{true}) \land \text{true} = \text{true} \land \text{true} = \text{true} \).',
            ],
            // Câu 13: SINGLE_CHOICE
            [
                'content'       => 'Mệnh đề nào là một tautology (luôn đúng)?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( P \lor \neg P \)", 'is_correct' => true],
                    ['content' => "\( P \land \neg P \)", 'is_correct' => false],
                    ['content' => "\( P \implies Q \)", 'is_correct' => false],
                    ['content' => "\( P \land Q \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P \lor \neg P \) luôn đúng theo luật bài trung.',
            ],
            // Câu 14: MULTIPLE_CHOICE
            [
                'content'       => 'Chọn các mệnh đề đúng về tập hợp.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "Tập rỗng là tập con của mọi tập hợp", 'is_correct' => true],
                    ['content' => "Mọi tập hợp đều là tập con của chính nó", 'is_correct' => true],
                    ['content' => "Tập hợp \( \{1, 3\} \) là tập con của \( \{1, 2, 3\} \)", 'is_correct' => true],
                    ['content' => "Mọi tập hợp đều có số phần tử hữu hạn", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Tập rỗng và tập hợp là tập con của chính nó là đúng. \( \{1, 3\} \subset \{1, 2, 3\} \). Không phải tập nào cũng hữu hạn (ví dụ: tập số tự nhiên).',
            ],
            // Câu 15: TRUE_FALSE
            [
                'content'       => 'Mệnh đề: "Nếu \( n \) là số nguyên thì \( n + 2 \) là số nguyên" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Tổng của số nguyên với số nguyên là số nguyên.',
            ],
            // Câu 16: DRAG_DROP
            [
                'content'       => 'Cho \( F \): "Tôi tập thể dục", \( G \): "Tôi khỏe mạnh". Giá trị của \( F \iff G \) khi \( F \) đúng và \( G \) sai là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Sai", 'is_correct' => true],
                    ['content' => "Đúng", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( F \iff G = (F \implies G) \land (G \implies F) \). Với \( F = \text{true}, G = \text{false} \): \( F \implies G = \text{false} \), nên \( F \iff G = \text{false} \).',
            ],
            // Câu 17: SINGLE_CHOICE
            [
                'content'       => 'Phủ định của mệnh đề: "Có số thực \( x \) sao cho \( x^2 = 25 \)" là gì?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "Mọi số thực \( x \) đều thỏa \( x^2 \neq 25 \)", 'is_correct' => true],
                    ['content' => "Có số thực \( x \) sao cho \( x^2 = 25 \)", 'is_correct' => false],
                    ['content' => "Mọi số thực \( x \) đều thỏa \( x^2 = 25 \)", 'is_correct' => false],
                    ['content' => "Không có số thực \( x \) nào thỏa \( x^2 \neq 25 \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Phủ định của \( \exists x P(x) \) là \( \forall x \neg P(x) \).',
            ],
            // Câu 18: MULTIPLE_CHOICE
            [
                'content'       => 'Chọn các mệnh đề đúng khi \( H \): "Tôi đi chợ", \( I \): "Tôi mua rau", \( J \): "Tôi nấu ăn", và \( H \) đúng, \( I \) sai, \( J \) đúng.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "\( H \lor J \)", 'is_correct' => true],
                    ['content' => "\( \neg I \)", 'is_correct' => true],
                    ['content' => "\( H \land I \)", 'is_correct' => false],
                    ['content' => "\( I \implies J \)", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( H = \text{true}, I = \text{false}, J = \text{true} \): \( H \lor J = \text{true}, \neg I = \text{true}, H \land I = \text{false}, I \implies J = \text{true} \).',
            ],
            // Câu 19: TRUE_FALSE
            [
                'content'       => 'Mệnh đề: "Có số nguyên âm lớn hơn mọi số dương" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Sai", 'is_correct' => true],
                    ['content' => "Đúng", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Không tồn tại số nguyên âm lớn hơn mọi số dương.',
            ],
            // Câu 20: DRAG_DROP
            [
                'content'       => 'Cho \( K \): "Hôm nay trời đẹp", \( L \): "Tôi đi picnic". Nếu \( K \land L \) sai và \( K \) đúng, thì \( L \) là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Sai", 'is_correct' => true],
                    ['content' => "Đúng", 'is_correct' => false],
                    ['content' => "Không xác định", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( K \land L = \text{false}, K = \text{true} \implies L = \text{false} \).',
            ],
            // Câu 21: SINGLE_CHOICE
            [
                'content'       => 'Mệnh đề nào tương đương với \( \neg (M \land N) \), trong đó \( M \): "Tôi học bài", \( N \): "Tôi thi đậu"?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( \neg M \lor \neg N \)", 'is_correct' => true],
                    ['content' => "\( \neg M \land \neg N \)", 'is_correct' => false],
                    ['content' => "\( M \lor N \)", 'is_correct' => false],
                    ['content' => "\( M \land N \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Theo định luật De Morgan: \( \neg (M \land N) = \neg M \lor \neg N \).',
            ],
            // Câu 22: MULTIPLE_CHOICE
            [
                'content'       => 'Chọn các mệnh đề đúng về số nguyên tố.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "Mọi số nguyên tố lớn hơn 2 đều lẻ", 'is_correct' => true],
                    ['content' => "Có số nguyên tố là số chẵn", 'is_correct' => true],
                    ['content' => "Số 1 là số nguyên tố", 'is_correct' => false],
                    ['content' => "Mọi số lớn hơn 1 đều là số nguyên tố", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '2 là số nguyên tố chẵn. Số 1 không phải nguyên tố. Không phải số lớn hơn 1 nào cũng là nguyên tố (ví dụ: 4).',
            ],
            // Câu 23: TRUE_FALSE
            [
                'content'       => 'Mệnh đề: "Nếu \( x \) là số thực dương thì \( x^3 > 0 \)" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Lũy thừa ba của số thực dương luôn dương.',
            ],
            // Câu 24: DRAG_DROP
            [
                'content'       => 'Cho \( O \): "Tôi đi học", \( P \): "Tôi mang vở", \( Q \): "Tôi ghi bài". Khi \( O \) sai, \( P \) đúng, \( Q \) sai, thì \( O \land P \) là <-Drag->, \( P \lor Q \) là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Sai", 'is_correct' => true],
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Không xác định", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( O = \text{false}, P = \text{true}, Q = \text{false} \): \( O \land P = \text{false}, P \lor Q = \text{true} \).',
            ],
            // Câu 25: SINGLE_CHOICE
            [
                'content'       => 'Mệnh đề nào là mâu thuẫn (luôn sai)?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( R \land \neg R \)", 'is_correct' => true],
                    ['content' => "\( R \lor \neg R \)", 'is_correct' => false],
                    ['content' => "\( R \implies R \)", 'is_correct' => false],
                    ['content' => "\( R \iff R \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( R \land \neg R \) luôn sai theo luật mâu thuẫn.',
            ],
            // Câu 26: MULTIPLE_CHOICE
            [
                'content'       => 'Chọn các mệnh đề đúng khi \( S \): "Trời nắng", \( T \): "Tôi đi biển", \( U \): "Tôi tắm nắng", và \( S \) đúng, \( T \) sai, \( U \) đúng.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "\( S \lor U \)", 'is_correct' => true],
                    ['content' => "\( \neg T \)", 'is_correct' => true],
                    ['content' => "\( S \land T \)", 'is_correct' => false],
                    ['content' => "\( T \implies U \)", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( S = \text{true}, T = \text{false}, U = \text{true} \): \( S \lor U = \text{true}, \neg T = \text{true}, S \land T = \text{false}, T \implies U = \text{true} \).',
            ],
            // Câu 27: TRUE_FALSE
            [
                'content'       => 'Mệnh đề: "Mọi số nguyên \( n \) đều thỏa mãn \( n + 4 > n \)" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Với mọi \( n \), \( n + 4 > n \) vì \( 4 > 0 \).',
            ],
            // Câu 28: DRAG_DROP
            [
                'content'       => 'Cho \( V \): "Tôi ăn sáng", \( W \): "Tôi no bụng". Giá trị của \( V \lor W \) khi \( V \) sai và \( W \) đúng là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( V = \text{false}, W = \text{true} \): \( V \lor W = \text{false} \lor \text{true} = \text{true} \).',
            ],
            // Câu 29: SINGLE_CHOICE
            [
                'content'       => 'Phủ định của mệnh đề: "Nếu một hàm liên tục thì nó có giới hạn" là gì?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "Có hàm liên tục nhưng không có giới hạn", 'is_correct' => true],
                    ['content' => "Mọi hàm liên tục đều có giới hạn", 'is_correct' => false],
                    ['content' => "Có hàm không liên tục nhưng có giới hạn", 'is_correct' => false],
                    ['content' => "Nếu hàm không có giới hạn thì không liên tục", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Phủ định của \( P \implies Q \) là \( P \land \neg Q \).',
            ],
            // Câu 30: MULTIPLE_CHOICE
            [
                'content'       => 'Chọn các mệnh đề đúng về quan hệ logic.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "\( P \implies Q \) tương đương với \( \neg P \lor Q \)", 'is_correct' => true],
                    ['content' => "\( \neg (P \lor Q) = \neg P \land \neg Q \)", 'is_correct' => true],
                    ['content' => "\( P \land Q = Q \land P \)", 'is_correct' => true],
                    ['content' => "\( P \lor Q = \neg P \lor \neg Q \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Các mệnh đề 1, 2, 3 đúng theo luật logic. Mệnh đề 4 sai vì không tương đương.',
            ],
            // Câu 31: TRUE_FALSE
            [
                'content'       => 'Mệnh đề: "Nếu \( x^2 \geq 0 \), thì \( x \) là số thực" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( x^2 \geq 0 \) đúng với mọi \( x \) thực, nên mệnh đề đúng.',
            ],
            // Câu 32: DRAG_DROP
            [
                'content'       => 'Cho \( X \): "Chó sủa", \( Y \): "Mèo kêu". Khi \( X \) đúng, \( Y \) sai, thì \( X \lor Y \) là <-Drag-> và \( X \land Y \) là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => true],
                    ['content' => "Không xác định", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( X = \text{true}, Y = \text{false} \): \( X \lor Y = \text{true}, X \land Y = \text{false} \).',
            ],
            // Câu 33: SINGLE_CHOICE
            [
                'content'       => 'Mệnh đề nào tương đương với \( P \iff Q \), trong đó \( P \): "Tôi cố gắng", \( Q \): "Tôi thành công"?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( (P \implies Q) \land (Q \implies P) \)", 'is_correct' => true],
                    ['content' => "\( P \lor Q \)", 'is_correct' => false],
                    ['content' => "\( P \land Q \)", 'is_correct' => false],
                    ['content' => "\( \neg P \lor \neg Q \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P \iff Q = (P \implies Q) \land (Q \implies P) \).',
            ],
            // Câu 34: MULTIPLE_CHOICE
            [
                'content'       => 'Chọn các mệnh đề đúng về hình học phẳng.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "Tổng các góc trong tam giác bằng 180 độ", 'is_correct' => true],
                    ['content' => "Mọi tam giác đều có ba cạnh bằng nhau", 'is_correct' => false],
                    ['content' => "Có tam giác không có góc nhọn", 'is_correct' => true],
                    ['content' => "Mọi hình chữ nhật đều là hình vuông", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Tổng góc tam giác là 180°. Có tam giác không nhọn (tam giác vuông hoặc tù). Không phải hình chữ nhật nào cũng là hình vuông.',
            ],
            // Câu 35: TRUE_FALSE
            [
                'content'       => 'Mệnh đề: "Nếu \( n \) là số chẵn thì \( n^2 \) là số chẵn" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Số chẵn bình phương vẫn là số chẵn (ví dụ: \( 2^2 = 4 \)).',
            ],
            // Câu 36: DRAG_DROP
            [
                'content'       => 'Cho \( A \): "Hôm nay là thứ Sáu", \( B \): "Tôi nghỉ ngơi". Nếu \( A \lor B \) đúng và \( A \) sai, thì \( B \) là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                    ['content' => "Không xác định", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( A \lor B = \text{true}, A = \text{false} \implies B = \text{true} \).',
            ],
            // Câu 37: SINGLE_CHOICE
            [
                'content'       => 'Phủ định của mệnh đề: "Mọi số tự nhiên đều lớn hơn 1" là gì?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "Có số tự nhiên không lớn hơn 1", 'is_correct' => true],
                    ['content' => "Mọi số tự nhiên đều nhỏ hơn 1", 'is_correct' => false],
                    ['content' => "Có số tự nhiên lớn hơn 1", 'is_correct' => false],
                    ['content' => "Không có số tự nhiên nào lớn hơn 1", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Phủ định của \( \forall x P(x) \) là \( \exists x \neg P(x) \).',
            ],
            // Câu 38: MULTIPLE_CHOICE
            [
                'content'       => 'Chọn các mệnh đề đúng khi \( C \): "Tôi ăn sáng", \( D \): "Tôi uống cà phê", \( E \): "Tôi tỉnh táo", và \( C \) sai, \( D \) đúng, \( E \) sai.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "\( \neg C \)", 'is_correct' => true],
                    ['content' => "\( D \lor E \)", 'is_correct' => true],
                    ['content' => "\( C \land D \)", 'is_correct' => false],
                    ['content' => "\( E \implies C \)", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( C = \text{false}, D = \text{true}, E = \text{false} \): \( \neg C = \text{true}, D \lor E = \text{true}, C \land D = \text{false}, E \implies C = \text{true} \).',
            ],
            // Câu 39: TRUE_FALSE
            [
                'content'       => 'Mệnh đề: "Nếu một số chia hết cho 12 thì nó chia hết cho 4" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Số chia hết cho 12 thì chia hết cho 4 vì 12 chia hết cho 4.',
            ],
            // Câu 40: DRAG_DROP
            [
                'content'       => 'Cho \( F \): "Tôi đi ngủ sớm", \( G \): "Tôi thức dậy sớm", \( H \): "Tôi khỏe mạnh". Khi \( F \) sai, \( G \) đúng, \( H \) sai, thì \( \neg F \) là <-Drag->, \( G \lor H \) là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( F = \text{false}, G = \text{true}, H = \text{false} \): \( \neg F = \text{true}, G \lor H = \text{true} \).',
            ],
        ];
        // get số lượng bản ghi bên exam paper
        $examPaperCount = ExamPaper::count();
        for ($i = 1; $i <= $examPaperCount; $i++) {
            for ($j = 0; $j < 40; $j++) {
                // Randomly pick a question from the $questions array
                $question = $questions[array_rand($questions)];

                // Remove answers from question array before creating ExamQuestion
                $answers = $question['answers'];
                unset($question['answers']);
                $correct = [];
                foreach ($answers as $idx => $answer) {
                    if ($answer['is_correct']) {
                        $correct[] = $answer['content'];
                    }
                    unset($answers[$idx]['is_correct']);
                }
                // $correct             = array_filter($answers, fn($item) => $item['is_correct']);
                $question['options'] = $answers;
                $question['correct'] = array_values($correct);
                $question['exam_paper_id'] = $i;



                ExamQuestion::create($question);
            }
        }
    }
}
