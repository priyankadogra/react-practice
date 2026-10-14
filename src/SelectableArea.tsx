import { useState } from 'react';

type SelectableAreaProps = {
    text: string;
};

export default function SelectableArea({text}: SelectableAreaProps) {
    const [popover, setPopover] = useState<{x: number, y: number, comment: string, text: string} | null>(null);
    const [displayCommentBox, setDisplayCommentBox] = useState<boolean>(false);
    return (
        <div className="selectable-area" onMouseUp={(e) => {
            const selection = window.getSelection();

            const text = selection?.toString();
            const start = selection?.anchorOffset;
            const end = selection?.focusOffset;

            const boundingRect = selection?.getRangeAt(0)?.getBoundingClientRect();

            if (text && start !== undefined && end !== undefined) {
                setPopover({x: boundingRect?.x, y: boundingRect?.y, comment: '', text});
            } else {
                setPopover(null);
            }
        }}>{text}{popover && (
            <div className="popover" style={{position: 'fixed', left: popover.x + 15, top: popover.y + 15}}>
                {displayCommentBox ? (
                    <>
                        <textarea placeholder="Add a comment..." value={popover.comment} onChange={(e) => {
                            setPopover({...popover, comment: e.target.value});
                        }} onMouseUp={(e) => e.stopPropagation()}/>
                        <button type="button" onClick={() => setDisplayCommentBox(false)}>Save comment</button> 
                    </>
                ) : (
                    <button type="button" onClick={() => setDisplayCommentBox(true)}>
                        Add comment
                    </button>
                )}
            </div>
        )}</div>
    );
}

/**
 * useState to store the range for which we need a comment
 */