import { useState } from "react";

export default function EditableField({value, onSave, placeholder = "Click para editar", type = "text", className = ""}) {

    const [editing, setEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value ?? "");
    const [loading, setLoading] = useState(false);

    const save = async () => {
        if (localValue === value) {
            setEditing(false);
            return;
        }

        try {
            setLoading(true);
            await onSave(localValue);
            setEditing(false);
        } catch (e) {
            console.error(e);
            setLocalValue(value ?? "");
        } finally {
            setLoading(false);
        }
    };

    if (editing) {
        if (type === "textarea") {
            return (
                <textarea
                    autoFocus
                    value={localValue}
                    disabled={loading}
                    onChange={e => setLocalValue(e.target.value)}
                    onBlur={save}
                    onKeyDown={e => e.key === "Escape" && setEditing(false)}
                    className={`w-full h border rounded-xs p-2 ${className} rounded-md`}
                    style={{"--h": "80px"}}
                />
            );
        }

        return (
            <input
                autoFocus
                type={type}
                value={localValue}
                disabled={loading}
                onChange={e => setLocalValue(e.target.value)}
                onBlur={save}
                onKeyDown={e => {
                    if (e.key === "Enter") save();
                    if (e.key === "Escape") setEditing(false);
                }}
                className={`w-full border rounded-xs ph-2 h ${className} rounded-md`}
                style={{ "--h": "40px" }}
            />
        );
    }

    return (
        <span className={`flex cursor-pointer border w-full h hover:underline ${className} rounded-md flex items-center ph-2 text-sm`} style={{"--h": type === 'text' ? "40px" : "80px"}} onClick={() => setEditing(true)}>
            {value || <em className="text-gray">{placeholder}</em>}
        </span>
    );
}