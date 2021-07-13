import Private from '../../../components/auth/Private'
import BlogCreate from '../../../components/crud/BlogCreate'

const Blog = () => {
    return (
        <Private>
            <div className="creator-container">
                <BlogCreate />
            </div>
        </Private>
    )
}

export default Blog
