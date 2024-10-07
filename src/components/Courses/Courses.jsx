import { useState, useEffect } from 'react';
import axios from 'axios';  
import { AiOutlinePlus } from 'react-icons/ai'; 
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

function Courses() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chapters, setChapters] = useState([{ name: '', lessons: [{ title: '', videoLink: '', subLessons: [{ title: '', videoLink: '' }] }] }]); // Updated structure
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [courses, setCourses] = useState([]); 
    const [editingCourseId, setEditingCourseId] = useState(null); 

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/courses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
        setSuccessMessage('');
        setErrorMessage('');
        setEditingCourseId(null);
        clearForm(); 
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const clearForm = () => {
        setCourseName('');
        setDescription('');
        setDuration('');
        setThumbnail(null);
        setChapters([{ name: '', lessons: [{ title: '', videoLink: '', subLessons: [{ title: '', videoLink: '' }] }] }]); // Reset to initial structure
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', courseName);
        formData.append('description', description);
        formData.append('duration', duration);
        formData.append('thumbnail', thumbnail);
        formData.append('chapters', JSON.stringify(chapters));

        try {
            if (editingCourseId) {
                await axios.put(`http://localhost:3000/courses/${editingCourseId}`, {
                    name: courseName,
                    description,
                    duration,
                    thumbnail,
                    chapters
                });
                setSuccessMessage('Course updated successfully!');
            } else {
                await axios.post('http://localhost:3000/courses', {
                    name: courseName,
                    description,
                    duration,
                    thumbnail,
                    chapters
                });
                setSuccessMessage('Course added successfully!');
            }

            setErrorMessage(''); 
            handleModalClose(); 
            fetchCourses(); 
        } 
        catch (error) {
            console.error('Error adding/updating course:', error);
            setErrorMessage('Failed to add/update course. Please try again.'); 
            setSuccessMessage(''); 
        }
    };

    const handleChapterChange = (index, event) => {
        const newChapters = [...chapters];
        newChapters[index].name = event.target.value;
        setChapters(newChapters);
    };

    const handleLessonChange = (chapterIndex, lessonIndex, event) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons[lessonIndex].title = event.target.value; 
        setChapters(newChapters);
        setErrorMessage(''); 
    };

    const handleVideoLinkChange = (chapterIndex, lessonIndex, event) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons[lessonIndex].videoLink = event.target.value; // Handle video link change for lesson
        setChapters(newChapters);
    };

    const handleAddChapter = () => {
        setChapters([...chapters, { name: '', lessons: [{ title: '', videoLink: '', subLessons: [{ title: '', videoLink: '' }] }] }]); // Updated structure
    };

    const handleAddLesson = (chapterIndex) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons.push({ title: '', videoLink: '', subLessons: [{ title: '', videoLink: '' }] }); // Updated structure
        setChapters(newChapters);
    };

    const handleAddSubLesson = (chapterIndex, lessonIndex) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons[lessonIndex].subLessons.push({ title: '', videoLink: '' }); // Add new sub-lesson
        setChapters(newChapters);
    };

    const handleSubLessonChange = (chapterIndex, lessonIndex, subLessonIndex, event) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons[lessonIndex].subLessons[subLessonIndex].title = event.target.value; // Change sub-lesson title
        setChapters(newChapters);
    };

    const handleSubLessonVideoLinkChange = (chapterIndex, lessonIndex, subLessonIndex, event) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons[lessonIndex].subLessons[subLessonIndex].videoLink = event.target.value; // Change sub-lesson video link
        setChapters(newChapters);
    };

    const handleEditCourse = (course) => {
        setCourseName(course.name);
        setDescription(course.description);
        setDuration(course.duration);
        setChapters(course.chapters); 
        setEditingCourseId(course._id); 
        setIsModalOpen(true); 
    };

    const handleDeleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/courses/${id}`);
            setSuccessMessage('Course deleted successfully!');
            fetchCourses(); 
        } catch (error) {
            console.error('Error deleting course:', error);
            setErrorMessage('Failed to delete course. Please try again.');
        }
    };
    const handleRemoveLesson = (chapterIndex, lessonIndex) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons.splice(lessonIndex, 1); // Remove the specific lesson
        setChapters(newChapters);
    };
    
    const handleRemoveSubLesson = (chapterIndex, lessonIndex, subLessonIndex) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons[lessonIndex].subLessons.splice(subLessonIndex, 1); // Remove the specific sub-lesson
        setChapters(newChapters);
    };
    
    return (
        <div className="min-h-screen">
            <nav className="px-4 py-3 flex justify-between items-center">
                <div className="text-lg font-bold">Courses</div>
                <div>
                    <button
                        onClick={handleModalOpen}
                        className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
                    >
                        Add New Course
                    </button>
                </div>
            </nav>

            {/* Courses Table */}
            <table className="min-w-full border-collapse border border-gray-200 mt-4">
                <thead>
                    <tr>
                        <th className="border border-gray-200 px-4 py-2">Course Name</th>
                        <th className="border border-gray-200 px-4 py-2">Description</th>
                        <th className="border border-gray-200 px-4 py-2">Duration</th>
                        <th className="border border-gray-200 px-4 py-2">Total Chapters</th>
                        <th className="border border-gray-200 px-4 py-2">Total Lessons</th>
                        <th className="border border-gray-200 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => {
                        const totalChapters = course.chapters.length;
                        const totalLessons = course.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);

                        return (
                            <tr key={course._id}>
                                <td className="border border-gray-200 px-4 py-2">{course.name}</td>
                                <td className="border border-gray-200 px-4 py-2">{course.description}</td>
                                <td className="border border-gray-200 px-4 py-2">{course.duration}</td>
                                <td className="border border-gray-200 px-4 py-2">{totalChapters}</td>
                                <td className="border border-gray-200 px-4 py-2">{totalLessons}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <button
                                        onClick={() => handleEditCourse(course)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                                    >
                                        <AiOutlineEdit /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCourse(course._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        <AiOutlineDelete /> Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Success and Error Messages */}
            {successMessage && <div className="mt-4 text-green-600">{successMessage}</div>}
            {errorMessage && <div className="mt-4 text-red-600">{errorMessage}</div>}

            {/* Modal for Adding/Editing Course */}
            {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg max-h-[80vh] w-[80vw] overflow-y-auto">
            <h2 className="text-2xl mb-4">{editingCourseId ? 'Edit Course' : 'Add Course'}</h2>
            {errorMessage && (
                <div className="mb-4 text-red-600">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Course Name</label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="border border-gray-300 rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded w-full p-2"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Duration</label>
                    <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="border border-gray-300 rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Thumbnail</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                </div>

                {/* Chapters Section */}
                <h3 className="text-xl font-semibold mb-2">Chapters</h3>
                {chapters.map((chapter, chapterIndex) => (
                    <div key={chapterIndex} className="mb-4 border p-4 rounded">
                        <input
                            type="text"
                            value={chapter.name}
                            onChange={(e) => handleChapterChange(chapterIndex, e)}
                            placeholder="Chapter Name"
                            className="border border-gray-300 rounded w-full p-2 mb-2"
                            required
                        />
                        {chapter.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="mb-2 border p-2 rounded">
                                <input
                                    type="text"
                                    value={lesson.title}
                                    onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, e)}
                                    placeholder="Lesson Title"
                                    className="border border-gray-300 rounded w-full p-2 mb-2"
                                    required
                                />
                                <input
                                    type="text"
                                    value={lesson.videoLink}
                                    onChange={(e) => handleVideoLinkChange(chapterIndex, lessonIndex, e)}
                                    placeholder="Lesson Video Link"
                                    className="border border-gray-300 rounded w-full p-2 mb-2"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => handleRemoveLesson(chapterIndex, lessonIndex)}
                                    className="text-red-500 hover:text-red-600 mb-2"
                                >
                                    Remove Lesson
                                </button>

                                <h4 className="font-semibold">Sub-Lessons</h4>
                                {lesson.subLessons.map((subLesson, subLessonIndex) => (
                                    <div key={subLessonIndex} className="mb-2 border p-2 rounded">
                                        <input
                                            type="text"
                                            value={subLesson.title}
                                            onChange={(e) => handleSubLessonChange(chapterIndex, lessonIndex, subLessonIndex, e)}
                                            placeholder="Sub-Lesson Title"
                                            className="border border-gray-300 rounded w-full p-2 mb-2"
                                            required
                                        />
                                        <input
                                            type="text"
                                            value={subLesson.videoLink}
                                            onChange={(e) => handleSubLessonVideoLinkChange(chapterIndex, lessonIndex, subLessonIndex, e)}
                                            placeholder="Sub-Lesson Video Link"
                                            className="border border-gray-300 rounded w-full p-2 mb-2"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSubLesson(chapterIndex, lessonIndex, subLessonIndex)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            Remove Sub-Lesson
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddSubLesson(chapterIndex, lessonIndex)}
                                    className="flex items-center text-blue-500 hover:text-blue-600"
                                >
                                    <AiOutlinePlus /> Add Sub-Lesson
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddLesson(chapterIndex)}
                            className="flex items-center text-blue-500 hover:text-blue-600"
                        >
                            <AiOutlinePlus /> Add Lesson
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddChapter}
                    className="flex items-center text-blue-500 hover:text-blue-600 mb-4"
                >
                    <AiOutlinePlus /> Add Chapter
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
                >
                    {editingCourseId ? 'Update Course' : 'Add Course'}
                </button>
            </form>
            <button onClick={handleModalClose} className="mt-4 text-red-500">Close</button>
        </div>
    </div>
)}

        </div>
    );
}

export default Courses;
