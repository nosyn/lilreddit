import { PrismaClient } from "@prisma/client";
import { generateSalt, hashPassword } from "../src/util/hashPassword";
import { users } from "./mocks/users";
import { posts } from "./mocks/posts";

const prisma = new PrismaClient();

const seedingUsers = async () => {
  console.log(`Seeding users`);
  for (const user of users) {
    // Creating a unique salt for a particular user
    const salt = generateSalt();

    // Hashing user's salt and password with 1000 iterations,
    const hashedPassword = hashPassword(user.password, salt);

    await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        salt,
        username: user.username,
      },
    });
    console.log(`Created user ${user.username} with id: ${user.id}`);
  }
};

const seedingPosts = async () => {
  console.log(`Seeding posts`);
  for (const post of posts) {
    await prisma.post.create({
      data: {
        content: post.content,
        title: post.title,
        authorId: post.authorId,
      },
    });

    console.log(
      `Created posts with title ${post.title} for user with id: ${post.authorId}`
    );
  }
};

async function main() {
  console.log(`Start seeding ...`);

  // Seeding Users
  await seedingUsers();

  // Seeding Posts
  await seedingPosts();

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
