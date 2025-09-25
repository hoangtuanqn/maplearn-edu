"use client";
import React, { useState, useEffect } from "react";
import RenderLatex from "~/components/RenderLatex";

interface ValueType {
    id: number;
    content: string;
}

interface DraggableItemProps {
    id: string;
    children: React.ReactNode;
    disabled: boolean;
}

const DraggableItem = ({ id, children, disabled }: DraggableItemProps) => {
    const onDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("text/plain", id);
    };

    return (
        <div
            draggable={!disabled}
            onDragStart={onDragStart}
            className={`bg-primary flex ${disabled ? "cursor-not-allowed" : "cursor-grab"} items-center justify-center rounded px-4 py-1 text-white select-none`}
        >
            {children}
        </div>
    );
};

interface DropZoneProps {
    id: string;
    onDropItem: (dropId: string, itemId: string) => void;
    onRemoveItem: (dropId: string, itemId: string) => void;
    droppedItem: ValueType | null;
    disabled: boolean;
}

const DropZone = ({ id, onDropItem, onRemoveItem, droppedItem, disabled }: DropZoneProps) => {
    const onDragOver = (e: React.DragEvent) => e.preventDefault();

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("text/plain");
        onDropItem(id, itemId);
    };

    const onDragStart = (e: React.DragEvent) => {
        if (disabled) return;
        if (droppedItem) {
            e.dataTransfer.setData("text/plain", `${droppedItem.content}`);
            onRemoveItem(id, `${droppedItem.content}`);
        }
    };

    return (
        <span
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragStart={onDragStart}
            draggable={!disabled && !!droppedItem}
            className={`text-primary mx-2 line-clamp-1 inline-block min-h-8 w-fit min-w-[120px] rounded-lg border border-dashed border-gray-400 px-3 py-1 text-center align-middle ${
                droppedItem ? "bg-primary cursor-grab text-white" : "bg-white"
            }`}
        >
            {droppedItem ? <RenderLatex content={droppedItem.content} /> : "?"}
        </span>
    );
};

interface DragDropProps {
    question: string;
    items: ValueType[];
    idQuestion: number;
    activeAnswers: string[];
    handleChoiceAnswer: (questionId: number, answer: string, idx: number) => void;
    disabled?: boolean;
}

const DragDrop = ({
    idQuestion,
    question,
    items: initialItems,
    activeAnswers,
    handleChoiceAnswer,
    disabled = false,
}: DragDropProps) => {
    const [items, setItems] = useState<ValueType[]>(
        initialItems.filter((item) => !activeAnswers?.includes(item.content)),
    );

    const [droppedItems, setDroppedItems] = useState<Record<string, ValueType | null>>(() => {
        const initial: Record<string, ValueType | null> = {};
        activeAnswers?.forEach((val, index) => {
            if (val) {
                const dropId = `drop${index + 1}`;
                initial[dropId] = { id: index + 1, content: val };
            }
        });
        return initial;
    });

    const parseQuestion = (text: string) => {
        const placeholderRegex = /<-Drag->/g;
        const parts: (string | { id: string })[] = [];
        let lastIndex = 0;
        let match;
        let dropCount = 1;

        while ((match = placeholderRegex.exec(text)) !== null) {
            const id = `drop${dropCount++}`;
            if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
            parts.push({ id });
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < text.length) parts.push(text.slice(lastIndex));

        return parts;
    };

    const handleDropItem = (dropId: string, itemId: string) => {
        const droppedItemObj = initialItems.find((i) => `${i.content}` === itemId);
        if (!droppedItemObj) return;

        setDroppedItems((prevDropped) => {
            const prevItem = prevDropped[dropId];
            if (prevItem)
                setItems((prevItems) => [...prevItems.filter((i) => i.content !== prevItem.content), prevItem]);
            return { ...prevDropped, [dropId]: droppedItemObj };
        });

        setItems((prevItems) => prevItems.filter((i) => `${i.content}` !== itemId));
    };

    const handleRemoveItem = (dropId: string, itemId: string) => {
        setDroppedItems((prev) => ({ ...prev, [dropId]: null }));
        const removedItem = initialItems.find((i) => `${i.content}` === itemId);
        if (removedItem) setItems((prev) => [...prev, removedItem]);
    };

    useEffect(() => {
        Object.entries(droppedItems).forEach(([a, b]) => {
            if (b?.content && b.content.length > 0) {
                handleChoiceAnswer(idQuestion, b.content, Number(a.split("drop")[1]));
            }
        });
    }, [droppedItems, handleChoiceAnswer, idQuestion]);

    useEffect(() => {
        setItems(initialItems.filter((item) => !activeAnswers?.includes(item.content)));
    }, [initialItems, activeAnswers]);

    const questionParts = parseQuestion(question);

    return (
        <div>
            <div className="border-primary/30 mb-4 flex flex-wrap gap-3 rounded border-2 p-2">
                {items.map((item) => (
                    <DraggableItem key={item.content} id={`${item.content}`} disabled={disabled}>
                        <RenderLatex content={item.content} />
                    </DraggableItem>
                ))}
            </div>

            <div className="mb-4 flex items-end">
                {questionParts.map((part, index) =>
                    typeof part === "string" ? (
                        <RenderLatex key={`question-part-${index}`} content={part} />
                    ) : (
                        <DropZone
                            disabled={disabled}
                            key={part.id}
                            id={part.id}
                            droppedItem={droppedItems[part.id] || null}
                            onDropItem={handleDropItem}
                            onRemoveItem={handleRemoveItem}
                        />
                    ),
                )}
            </div>
        </div>
    );
};

export default DragDrop;
