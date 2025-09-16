import { Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Answers } from "~/schemaValidate/exam.schema";
import RenderLatex from "~/components/RenderLatex";

const SingleChoice = ({
    idQuestion,
    answers,
    activeAnswer,
    handleChoiceAnswer,
}: {
    idQuestion: number;
    answers: Answers[];
    activeAnswer: string[] | [];
    handleChoiceAnswer: (questionId: number, answer: string) => void;
}) => {
    return (
        <RadioGroup
            value={activeAnswer[0] || ""} // controlled component
            onValueChange={(value) => handleChoiceAnswer(idQuestion, value)}
            className="flex flex-col"
        >
            {answers?.map((answer) => {
                return (
                    <div key={answer.content} className="relative flex items-center gap-2">
                        <RadioGroupItem
                            value={answer.content}
                            id={answer.content}
                            className="peer data-[state=checked]:bg-primary size-7 rounded-full border-0 bg-slate-300"
                            onKeyDown={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                            onFocus={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                            onChange={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                        />
                        <Label htmlFor={answer.content} className="cursor-pointer leading-8">
                     
                            <RenderLatex content={answer.content} />
                        </Label>
                        <Check className="pointer-events-none absolute top-1.5 left-1 size-5 text-white opacity-0 peer-data-[state=checked]:opacity-100" />
                    </div>
                );
            })}
        </RadioGroup>
    );
};

export default SingleChoice;
