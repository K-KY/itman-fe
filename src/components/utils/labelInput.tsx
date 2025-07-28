import React from "react";

const LabelInput = (
    {id, type, text, required, onChange}: {
        id: string,
        type: string,
        text: string,
        required?: boolean,
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    }) => {

    if (required) {
        return (
            <div className="flex items-center space-x-4">
                <label htmlFor={id} className="w-24 font-bold">
                    {text}
                </label>
                <input onChange={onChange}
                       type={type}
                       id={id}
                       placeholder={`${text}`}
                       required
                       className="flex-1 border p-2 rounded"
                />
            </div>

        )
    }
    return (
        <div className="flex items-center space-x-4">
            <label htmlFor={id} className="w-24 font-bold">
                {text}
            </label>
            <input onChange={onChange}
                   type={type}
                   id={id}
                   placeholder={`${text}`}
                   className="flex-1 border p-2 rounded"
            />
        </div>
    )
}

export {LabelInput};