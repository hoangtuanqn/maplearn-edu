<?php

namespace Database\Seeders;

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
            [

                'exam_paper_id' => 39,
                'content'       => 'Cho ba mệnh đề: \( P \): "Nếu hôm nay là thứ Hai, thì ngày mai là thứ Ba", \( Q \): "Hôm nay là thứ Hai", \( R \): "Ngày mai là thứ Ba". Xét các giá trị logic của \( P \), \( Q \), và \( R \). Mệnh đề nào sau đây luôn đúng bất kể giá trị của \( P \), \( Q \), và \( R \)?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( P \land Q \implies R \)", 'is_correct' => true],
                    ['content' => "\( P \land R \implies Q \)", 'is_correct' => false],
                    ['content' => "\( Q \land R \implies P \)", 'is_correct' => false],
                    ['content' => "\( P \lor Q \implies R \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Mệnh đề \( P \): \( Q \implies R \). Nếu \( P \) và \( Q \) đúng, thì \( R \) phải đúng để \( Q \implies R \) đúng. Do đó, \( P \land Q \implies R \) luôn đúng theo luật logic suy ra.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho mệnh đề: "Mọi số nguyên \( n \) chia hết cho 9 thì chia hết cho 3". Mệnh đề phủ định của mệnh đề này là gì?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "Có ít nhất một số nguyên \( n \) chia hết cho 9 nhưng không chia hết cho 3", 'is_correct' => true],
                    ['content' => "Mọi số nguyên \( n \) chia hết cho 9 là số lẻ", 'is_correct' => false],
                    ['content' => "Có ít nhất một số nguyên \( n \) chia hết cho 3 nhưng không chia hết cho 9", 'is_correct' => false],
                    ['content' => "Mọi số nguyên \( n \) chia hết cho 3 thì chia hết cho 9", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Phủ định của mệnh đề "Mọi \( A \) là \( B \)" là "Có ít nhất một \( A \) không phải \( B \)". Ở đây, \( A \): \( n \) chia hết cho 9, \( B \): \( n \) chia hết cho 3, nên phủ định là "Có ít nhất một \( n \) chia hết cho 9 nhưng không chia hết cho 3".',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Xét mệnh đề \( P \): "Nếu \( n \) là số nguyên dương chia hết cho 4, thì \( n^2 \) chia hết cho 16". Mệnh đề nào sau đây tương đương với \( P \)?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "Nếu \( n^2 \) không chia hết cho 16 thì \( n \) không chia hết cho 4", 'is_correct' => true],
                    ['content' => "Nếu \( n \) chia hết cho 4 thì \( n^2 \) chia hết cho 4", 'is_correct' => false],
                    ['content' => "Nếu \( n^2 \) chia hết cho 16 thì \( n \) chia hết cho 4", 'is_correct' => false],
                    ['content' => "\( n \) chia hết cho 4 hoặc \( n^2 \) chia hết cho 16", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Mệnh đề \( P \): \( n \) chia hết cho 4 \( \implies n^2 \) chia hết cho 16. Mệnh đề tương đương là \( \neg (n^2 \text{ chia hết cho } 16) \implies \neg (n \text{ chia hết cho } 4) \), tức là nếu \( n^2 \) không chia hết cho 16 thì \( n \) không chia hết cho 4.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Xét các mệnh đề sau về số nguyên \( n \). Chọn tất cả các mệnh đề đúng.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "Nếu \( n \) là số nguyên tố thì \( n \) là số lẻ", 'is_correct' => false],
                    ['content' => "Nếu \( n \) không là số nguyên tố thì \( n \) không là số lẻ", 'is_correct' => true],
                    ['content' => "Mọi số nguyên \( n \) chia hết cho 2 thì \( n \) là số chẵn", 'is_correct' => true],
                    ['content' => "Có số nguyên \( n \) sao cho \( n \) là số lẻ và không chia hết cho 2", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => 'Mệnh đề 1 sai vì 2 là số nguyên tố nhưng không lẻ. Mệnh đề 2 đúng vì tiền đề sai dẫn đến mệnh đề đúng. Mệnh đề 3 đúng vì số chia hết cho 2 là số chẵn. Mệnh đề 4 đúng vì mọi số lẻ không chia hết cho 2.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Xét mệnh đề: "Nếu \( x \) là số thực và \( x > 3 \), thì \( x^2 > 9 \)". Mệnh đề này có đúng với mọi số thực \( x \) không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => 'Với \( x > 3 \), ta có \( x^2 > 9 \) vì hàm \( f(x) = x^2 \) là hàm tăng trên \( (3, +\infty) \). Do đó, mệnh đề luôn đúng.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho các mệnh đề \( P \): "Hôm nay là thứ Tư", \( Q \): "Mai là thứ Năm". Giá trị của biểu thức logic \( (P \land Q) \lor \neg P \) khi \( P \) đúng và \( Q \) sai là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Sai", 'is_correct' => true],
                    ['content' => "Đúng", 'is_correct' => false],
                    ['content' => "Không xác định", 'is_correct' => false],
                    ['content' => "Luôn đúng", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Thay \( P = \text{true}, Q = \text{false} \): \( (\text{true} \land \text{false}) \lor \neg \text{true} = \text{false} \lor \text{false} = \text{false} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Hôm nay trời nắng", \( Q \): "Tôi đi dạo", \( R \): "Tôi mang ô". Nối các biểu thức logic sau với giá trị đúng của chúng khi \( P \) đúng, \( Q \) sai, \( R \) đúng. Kết quả là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "\( P \land R \to \text{Đúng} \)", 'is_correct' => true],
                    ['content' => "\( Q \lor R \to \text{Đúng} \)", 'is_correct' => true],
                    ['content' => "\( P \land Q \to \text{Sai} \)", 'is_correct' => true],
                    ['content' => "\( \neg Q \to \text{Đúng} \)", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{true}, Q = \text{false}, R = \text{true} \): \( P \land R = \text{true}, Q \lor R = \text{true}, P \land Q = \text{false}, \neg Q = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Mệnh đề nào sau đây là một tautology (luôn đúng với mọi giá trị của các biến)?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( P \lor \neg P \)", 'is_correct' => true],
                    ['content' => "\( P \land \neg P \)", 'is_correct' => false],
                    ['content' => "\( P \implies Q \)", 'is_correct' => false],
                    ['content' => "\( P \land Q \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P \lor \neg P \) luôn đúng vì một trong hai mệnh đề \( P \) hoặc \( \neg P \) luôn đúng theo luật bài trung.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho mệnh đề \( P \): "Nếu \( n \) là số nguyên dương và \( n^2 \) chia hết cho Hed 25, thì \( n \) chia hết cho 5". Mệnh đề phủ định của \( P \) là gì?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( n \) là số nguyên dương và \( n^2 \) không chia hết cho 5", 'is_correct' => true],
                    ['content' => "\( n \) không là số nguyên dương và \( n^2 \) chia hết cho 5", 'is_correct' => false],
                    ['content' => "\( n^2 \) chia hết cho 5 hoặc \( n \) không là số nguyên dương", 'is_correct' => false],
                    ['content' => "\( n \) là số nguyên dương hoặc \( n^2 \) chia hết cho 5", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Phủ định của \( A \implies B \) là \( A \land \neg B \). Ở đây, \( A \): \( n \) là số nguyên dương, \( B \): \( n^2 \) chia hết cho 5, nên phủ định là \( n \) là số nguyên dương và \( n^2 \) không chia hết cho 5.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Tôi học bài", \( Q \): "Tôi thi đậu". Giá trị của \( \neg (P \land Q) \) khi \( P \) sai và \( Q \) đúng là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{false}, Q = \text{true} \): \( P \land Q = \text{false}, \neg (P \land Q) = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Xét mệnh đề: "Nếu \( x^2 = 16 \) thì \( x = 4 \)". Mệnh đề này có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Sai", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( x^2 = 16 \implies x = 4 \) hoặc \( x = -4 \), nên mệnh đề sai vì không xét trường hợp \( x = -4 \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Chọn các mệnh đề tương đương với \( P \implies Q \), trong đó \( P \): "Tôi học bài", \( Q \): "Tôi thi đậu".',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "\( \neg P \lor Q \)", 'is_correct' => true],
                    ['content' => "\( \neg Q \implies \neg P \)", 'is_correct' => true],
                    ['content' => "\( P \land \neg Q \)", 'is_correct' => false],
                    ['content' => "\( P \lor Q \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P \implies Q \) tương đương với \( \neg P \lor Q \) và \( \neg Q \implies \neg P \) theo các định luật logic.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Hôm nay trời mưa", \( Q \): "Tôi ở nhà". Nếu \( P \) sai và \( Q \) đúng, giá trị của \( P \implies Q \) là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                    ['content' => "Không xác định", 'is_correct' => false],
                    ['content' => "Luôn sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{false}, Q = \text{true} \): \( P \implies Q = \neg P \lor Q = \text{true} \lor \text{true} = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Tôi đi học", \( Q \): "Tôi mang sách", \( R \): "Tôi ghi chép bài". Nối các biểu thức logic với giá trị đúng khi \( P \) đúng, \( Q \) sai, \( R \) đúng. Kết quả là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "\( P \land R \to \text{Đúng} \)", 'is_correct' => true],
                    ['content' => "\( Q \lor R \to \text{Đúng} \)", 'is_correct' => true],
                    ['content' => "\( P \land Q \to \text{Sai} \)", 'is_correct' => true],
                    ['content' => "\( \neg Q \to \text{Đúng} \)", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{true}, Q = \text{false}, R = \text{true} \): \( P \land R = \text{true}, Q \lor R = \text{true}, P \land Q = \text{false}, \neg Q = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Mệnh đề nào sau đây là mâu thuẫn (luôn sai)?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( P \land \neg P \)", 'is_correct' => true],
                    ['content' => "\( P \lor \neg P \)", 'is_correct' => false],
                    ['content' => "\( P \implies P \)", 'is_correct' => false],
                    ['content' => "\( P \land P \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P \land \neg P \) luôn sai vì \( P \) và \( \neg P \) không thể đồng thời đúng.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Nếu \( x \) là số thực dương thì \( x^2 > 0 \)". Mệnh đề phủ định của \( P \) là gì?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( x \) là số thực dương và \( x^2 \leq 0 \)", 'is_correct' => true],
                    ['content' => "\( x \) không là số thực dương và \( x^2 > 0 \)", 'is_correct' => false],
                    ['content' => "\( x \) là số thực dương hoặc \( x^2 > 0 \)", 'is_correct' => false],
                    ['content' => "\( x \) không là số thực dương hoặc \( x^2 \leq 0 \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Phủ định của \( A \implies B \) là \( A \land \neg B \). Ở đây, \( A \): \( x \) là số thực dương, \( B \): \( x^2 > 0 \), nên phủ định là \( x \) là số thực dương và \( x^2 \leq 0 \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Tôi đi ngủ sớm", \( Q \): "Tôi thức dậy sớm". Giá trị của \( (P \lor Q) \land \neg P \) khi \( P \) sai và \( Q \) đúng là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{false}, Q = \text{true} \): \( (P \lor Q) \land \neg P = (\text{false} \lor \text{true}) \land \text{true} = \text{true} \land \text{true} = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Mệnh đề "Mọi số thực \( x \) đều thỏa mãn \( x^2 \geq 0 \)" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => 'Với mọi số thực \( x \), \( x^2 \geq 0 \) luôn đúng vì bình phương của bất kỳ số thực nào cũng không âm.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Tôi học bài", \( Q \): "Tôi thi đậu", \( R \): "Tôi vui vẻ". Chọn các mệnh đề đúng khi \( P \) sai, \( Q \) đúng, \( R \) sai.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "\( \neg P \)", 'is_correct' => true],
                    ['content' => "\( Q \lor R \)", 'is_correct' => true],
                    ['content' => "\( P \land Q \)", 'is_correct' => false],
                    ['content' => "\( R \implies P \)", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{false}, Q = \text{true}, R = \text{false} \): \( \neg P = \text{true}, Q \lor R = \text{true}, P \land Q = \text{false}, R \implies P = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Mệnh đề nào sau đây tương đương với \( \neg (P \land Q) \), trong đó \( P \): "Hôm nay trời mưa", \( Q \): "Tôi ở nhà"?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( \neg P \lor \neg Q \)", 'is_correct' => true],
                    ['content' => "\( \neg P \land \neg Q \)", 'is_correct' => false],
                    ['content' => "\( P \lor Q \)", 'is_correct' => false],
                    ['content' => "\( P \land Q \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Theo định luật De Morgan, \( \neg (P \land Q) = \neg P \lor \neg Q \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Hôm nay là thứ Bảy", \( Q \): "Tôi đi chơi". Nếu \( P \implies Q \) đúng và \( Q \) sai, thì \( P \) là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Sai", 'is_correct' => true],
                    ['content' => "Đúng", 'is_correct' => false],
                    ['content' => "Không xác định", 'is_correct' => false],
                    ['content' => "Luôn đúng", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P \implies Q = \neg P \lor Q \). Nếu \( Q = \text{false} \) và \( P \implies Q = \text{true} \), thì \( \neg P = \text{true} \), suy ra \( P = \text{false} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Tôi đi học", \( Q \): "Tôi mang sách", \( R \): "Tôi ghi chép bài". Nối các biểu thức logic với giá trị khi \( P \) sai, \( Q \) sai, \( R \) đúng. Kết quả là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "\( P \lor R \to \text{Đúng} \)", 'is_correct' => true],
                    ['content' => "\( Q \land R \to \text{Sai} \)", 'is_correct' => true],
                    ['content' => "\( \neg P \to \text{Đúng} \)", 'is_correct' => true],
                    ['content' => "\( P \implies Q \to \text{Đúng} \)", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{false}, Q = \text{false}, R = \text{true} \): \( P \lor R = \text{true}, Q \land R = \text{false}, \neg P = \text{true}, P \implies Q = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Mệnh đề nào sau đây là phủ định của "Nếu \( n \) là số lẻ thì \( n \) không chia hết cho 2"?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( n \) là số lẻ và \( n \) chia hết cho 2", 'is_correct' => true],
                    ['content' => "\( n \) là số chẵn và \( n \) chia hết cho 2", 'is_correct' => false],
                    ['content' => "\( n \) là số lẻ hoặc \( n \) chia hết cho 2", 'is_correct' => false],
                    ['content' => "\( n \) không là số lẻ và \( n \) chia hết cho 2", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Phủ định của \( A \implies B \) là \( A \land \neg B \). Ở đây, \( A \): \( n \) là số lẻ, \( B \): \( n \) không chia hết cho 2, nên phủ định là \( n \) là số lẻ và \( n \) chia hết cho 2.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Tôi học bài", \( Q \): "Tôi thi đậu". Giá trị của \( P \iff Q \) khi \( P \) đúng và \( Q \) sai là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Sai", 'is_correct' => true],
                    ['content' => "Đúng", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P \iff Q = (P \implies Q) \land (Q \implies P) \). Với \( P = \text{true}, Q = \text{false} \): \( P \implies Q = \text{false}, Q \implies P = \text{true} \), nên \( P \iff Q = \text{false} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Mệnh đề "Nếu \( x^2 \geq 0 \) thì \( x \) là số thực" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( x^2 \geq 0 \) đúng với mọi \( x \) thực, và \( x \) là số thực, nên mệnh đề đúng.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Tôi đi học", \( Q \): "Tôi mang sách", \( R \): "Tôi ghi chép bài". Chọn các mệnh đề đúng khi \( P \) đúng, \( Q \) sai, \( R \) đúng.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "\( P \lor R \)", 'is_correct' => true],
                    ['content' => "\( \neg Q \)", 'is_correct' => true],
                    ['content' => "\( P \land Q \)", 'is_correct' => false],
                    ['content' => "\( Q \implies R \)", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{true}, Q = \text{false}, R = \text{true} \): \( P \lor R = \text{true}, \neg Q = \text{true}, P \land Q = \text{false}, Q \implies R = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Mệnh đề nào tương đương với \( P \iff Q \), trong đó \( P \): "Tôi học bài", \( Q \): "Tôi thi đậu"?',
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
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Hôm nay là thứ Bảy", \( Q \): "Tôi đi chơi". Nếu \( P \lor Q \) đúng và \( P \) sai, thì \( Q \) là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                    ['content' => "Không xác định", 'is_correct' => false],
                    ['content' => "Luôn sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P \lor Q = \text{true}, P = \text{false} \implies Q = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Tôi đi học", \( Q \): "Tôi mang sách", \( R \): "Tôi ghi chép bài". Nối các biểu thức logic với giá trị khi \( P \) đúng, \( Q \) đúng, \( R \) sai. Kết quả là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "\( P \land Q \to \text{Đúng} \)", 'is_correct' => true],
                    ['content' => "\( Q \lor R \to \text{Đúng} \)", 'is_correct' => true],
                    ['content' => "\( P \land R \to \text{Sai} \)", 'is_correct' => true],
                    ['content' => "\( \neg R \to \text{Đúng} \)", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{true}, Q = \text{true}, R = \text{false} \): \( P \land Q = \text{true}, Q \lor R = \text{true}, P \land R = \text{false}, \neg R = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Mệnh đề nào sau đây không phải là tautology?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( P \implies Q \)", 'is_correct' => true],
                    ['content' => "\( P \lor \neg P \)", 'is_correct' => false],
                    ['content' => "\( P \implies P \)", 'is_correct' => false],
                    ['content' => "\( (P \land Q) \lor \neg (P \land Q) \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P \implies Q \) không phải là tautology vì giá trị của nó phụ thuộc vào \( P \) và \( Q \). Các mệnh đề còn lại luôn đúng.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Phủ định của mệnh đề "Có số thực \( x \) sao cho \( x^2 = 25 \)" là gì?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "Mọi số thực \( x \) đều thỏa \( x^2 \neq 25 \)", 'is_correct' => true],
                    ['content' => "Có số thực \( x \) sao cho \( x^2 = 25 \)", 'is_correct' => false],
                    ['content' => "Mọi số thực \( x \) đều thỏa \( x^2 = 25 \)", 'is_correct' => false],
                    ['content' => "Không có số thực \( x \) nào thỏa \( x^2 \neq 25 \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Phủ định của "Có \( x \), \( P(x) \)" là "Mọi \( x \), \( \neg P(x) \)". Ở đây, \( P(x) \): \( x^2 = 25 \), nên phủ định là "Mọi \( x \), \( x^2 \neq 25 \)".',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Hôm nay trời mưa", \( Q \): "Tôi ở nhà". Giá trị của \( \neg (P \lor Q) \) khi \( P \) sai và \( Q \) sai là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                    ['content' => "Sai", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{false}, Q = \text{false} \): \( P \lor Q = \text{false}, \neg (P \lor Q) = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Mệnh đề "Mọi số nguyên \( n \) đều thỏa mãn \( n + 2 > n \)" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => 'Với mọi số nguyên \( n \), \( n + 2 > n \) luôn đúng vì \( 2 > 0 \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Tôi đi học", \( Q \): "Tôi mang sách", \( R \): "Tôi ghi chép bài". Chọn các mệnh đề đúng khi \( P \) sai, \( Q \) đúng, \( R \) sai.',
                'type'          => 'MULTIPLE_CHOICE',
                'answers'       => [
                    ['content' => "\( \neg P \)", 'is_correct' => true],
                    ['content' => "\( Q \lor R \)", 'is_correct' => true],
                    ['content' => "\( P \land Q \)", 'is_correct' => false],
                    ['content' => "\( R \implies P \)", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{false}, Q = \text{true}, R = \text{false} \): \( \neg P = \text{true}, Q \lor R = \text{true}, P \land Q = \text{false}, R \implies P = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Mệnh đề nào tương đương với \( \neg (P \implies Q) \), trong đó \( P \): "Tôi học bài", \( Q \): "Tôi thi đậu"?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "\( P \land \neg Q \)", 'is_correct' => true],
                    ['content' => "\( \neg P \land Q \)", 'is_correct' => false],
                    ['content' => "\( P \lor Q \)", 'is_correct' => false],
                    ['content' => "\( \neg P \lor \neg Q \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( \neg (P \implies Q) = \neg (\neg P \lor Q) = P \land \neg Q \) theo định luật De Morgan.',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Hôm nay là thứ Bảy", \( Q \): "Tôi đi chơi". Nếu \( P \land Q \) sai và \( P \) đúng, thì \( Q \) là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Sai", 'is_correct' => true],
                    ['content' => "Đúng", 'is_correct' => false],
                    ['content' => "Không xác định", 'is_correct' => false],
                    ['content' => "Luôn đúng", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P \land Q = \text{false}, P = \text{true} \implies Q = \text{false} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Tôi đi học", \( Q \): "Tôi mang sách", \( R \): "Tôi ghi chép bài". Nối các biểu thức logic với giá trị khi \( P \) sai, \( Q \) đúng, \( R \) sai. Kết quả là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "\( P \land Q \to \text{Sai} \)", 'is_correct' => true],
                    ['content' => "\( Q \lor R \to \text{Đúng} \)", 'is_correct' => true],
                    ['content' => "\( \neg P \to \text{Đúng} \)", 'is_correct' => true],
                    ['content' => "\( P \implies R \to \text{Đúng} \)", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{false}, Q = \text{true}, R = \text{false} \): \( P \land Q = \text{false}, Q \lor R = \text{true}, \neg P = \text{true}, P \implies R = \text{true} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Phủ định của mệnh đề "Mọi số thực \( x \), \( x^2 \geq 0 \)" là gì?',
                'type'          => 'SINGLE_CHOICE',
                'answers'       => [
                    ['content' => "Có số thực \( x \) sao cho \( x^2 < 0 \)", 'is_correct' => true],
                    ['content' => "Mọi số thực \( x \), \( x^2 < 0 \)", 'is_correct' => false],
                    ['content' => "Có số thực \( x \) sao cho \( x^2 \geq 0 \)", 'is_correct' => false],
                    ['content' => "Mọi số thực \( x \), \( x^2 = 0 \)", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => 'Phủ định của "Mọi \( x \), \( P(x) \)" là "Có \( x \), \( \neg P(x) \)". Ở đây, \( P(x) \): \( x^2 \geq 0 \), nên phủ định là "Có \( x \), \( x^2 < 0 \)".',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Cho \( P \): "Hôm nay trời mưa", \( Q \): "Tôi ở nhà". Giá trị của \( (P \implies Q) \land (Q \implies P) \) khi \( P \) sai và \( Q \) đúng là <-Drag->.',
                'type'          => 'DRAG_DROP',
                'answers'       => [
                    ['content' => "Sai", 'is_correct' => true],
                    ['content' => "Đúng", 'is_correct' => false],
                ],
                'marks'       => 0.25,
                'explanation' => '\( P = \text{false}, Q = \text{true} \): \( P \implies Q = \text{true}, Q \implies P = \text{false} \), nên \( (P \implies Q) \land (Q \implies P) = \text{false} \).',
            ],
            [
                'exam_paper_id' => 39,
                'content'       => 'Mệnh đề "Nếu \( n \) là số nguyên thì \( n + 1 \) là số nguyên" có đúng không?',
                'type'          => 'TRUE_FALSE',
                'answers'       => [
                    ['content' => "Đúng", 'is_correct' => true],
                ],
                'marks'       => 0.25,
                'explanation' => 'Nếu \( n \) là số nguyên thì \( n + 1 \) cũng là số nguyên, do đó mệnh đề đúng.',
            ],
        ];
        for ($i = 0; $i < 40; $i++) {
            // Randomly pick a question from the $questions array
            $question = $questions[array_rand($questions)];

            // Remove answers from question array before creating ExamQuestion
            $answers = $question['answers'];
            unset($question['answers']);
            $correct             = array_filter($answers, fn($item) => $item['is_correct']);
            $question['options'] = $answers;
            $question['correct'] = array_values($correct);

            ExamQuestion::create($question);
        }
    }
}
