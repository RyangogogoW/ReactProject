import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("John Smith");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory(); // we can use to go back or go forward through histroy

    const handleSubmit = (e) => {
        e.preventDefault(); //to prevent automatically refresh the page after clicking the button
        const blog = { title, body, author };
        setIsPending(true);
        fetch('http://localhost:8000/blogs', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
            //the JSON db server will automatically add id to the blog.
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
            // history.go(-1); negative: go back; positive: go forward
            history.push("/"); //go to the home page.


        })


    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}></input>

                <label>Blog body:</label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>

                <label>Blog author:</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="John Smith">John Smith</option>
                    <option value="Sara Johnson">Sara Johnson</option>
                    <option value="David Lee">David Lee</option>
                    <option value="Emily Kim">Emily Kim</option>
                    <option value="Alex Johnson">Alex Johnson</option>
                </select>

                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Add Blog....</button>}
                <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p>
            </form>
        </div>
    );
}

export default Create;