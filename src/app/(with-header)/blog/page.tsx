import { PostCard } from "./_component/post-card";
import type { PostMeta } from "./_component/types";
import postsData from "./content.json";

export default function BlogIndexPage() {
    // const posts = getMockPosts();
    const posts = postsData as PostMeta[];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
            ))}
        </div>
    );
}

// function getMockPosts(length: number = 20): PostMeta[] {
//     // Generate mock posts via faker to simulate realistic blog content.
//     return Array.from({ length }).map((): PostMeta => {
//         const includeImage = faker.datatype.boolean();
//         const includeDescription = faker.datatype.boolean();
//         const includeTags = faker.datatype.boolean();

//         return {
//             slug: faker.string.uuid(),
//             title: faker.lorem.sentence(),
//             date: faker.date.recent({ days: 365 }).toISOString(),
//             tags: includeTags ? faker.lorem.words(3).split(" ") : undefined,
//             description: includeDescription ? faker.lorem.sentence() : undefined,
//             image: includeImage ? `https://picsum.photos/seed/${faker.number.int({ min: 100, max: 1000 })}/1920/1080` : undefined,
//         };
//     });
// }
