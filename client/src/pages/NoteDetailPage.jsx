import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';

const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Unable to delete note");
        }
    };

    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title & content");
            return;
        };

        setIsSaving(true);
        try {
            await api.put(`/notes/${id}`, note);
            toast.success("Note Updated!");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Unable to save the note! :(");
        } finally {
            setIsSaving(false);
        }

    };

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                console.log(res);
                setNote(res.data);
            } catch (error) {
                toast.error("Failed to load the note");
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchNote();
    }, [id]);

    if (isLoading) {
        return (
            <div className='min-h-screen bg-base-200 flex items-center justify-center'>
                <LoaderIcon className='animate-spin size-10' />
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to Notes
                        </Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5" />
                            Delete Note
                        </button>
                    </div>

                    <div className='card bg-base-100'>
                        <div className='card-body'>
                            <div className='form-control mb-4'>
                                <label className='fieldset'>
                                    <span className='fieldset-label'>Title</span>
                                </label>

                                <input type="text"
                                    placeholder='Note Title'
                                    className='input input-bordered w-full'
                                    value={note.title}
                                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                                />

                            </div>
                            <div className='form-control mb-4'>
                                <label className='fieldset'>
                                    <span className='fieldset-label'>Content</span>
                                </label>

                                <textarea
                                    placeholder='Write your text here...'
                                    className='textarea textarea-bordered h-32 w-full'
                                    value={note.content}
                                    onChange={(e) => setContent({ ...note, title: e.target.value })}
                                />

                            </div>
                            <div className="card-actions justify-end">
                                <button className='btn btn-primary' disabled={isSaving} onClick={handleSave}>
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NoteDetailPage