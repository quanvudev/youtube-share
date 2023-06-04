import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();

export const seed = async () => {
  const pwdHash = await argon2.hash('123456');

  await prisma.user.createMany({
    data: Array(10)
      .fill('')
      .map((_, idx) => ({
        email: `dev${idx === 0 ? '' : idx}@developer.dev`,
        password: pwdHash,
      })),
  });

  await prisma.video.createMany({
    data: [
      {
        url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
        authorId: 1,
        title: 'Turborepo in 2 Minutes',
        description:
          'How exactly does turbo make your tasks so fast? Matt Pocock (@mattpocockuk) explains (in two minutes or less 😅). Try Turborepo: https://vercel.fyi/tryturbo',
      },
      {
        url: 'https://www.youtube.com/watch?v=61M2takIKl8',
        authorId: 2,
        title: "Introduction [1 of 8] | Beginner's Series to: Dev Containers",
        description:
          'Join Brigit Murtaugh to kick start your learning with developing in a Docker container in Visual Studio Code! Learn what it means to configure a container-based development environment, why you might want to develop in a container in VS Code, and what lies ahead in the rest of this video series.',
      },
      {
        url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
        authorId: 3,
        title: 'Turborepo in 2 Minutes',
        description:
          'How exactly does turbo make your tasks so fast? Matt Pocock (@mattpocockuk) explains (in two minutes or less 😅). Try Turborepo: https://vercel.fyi/tryturbo',
      },
      {
        url: 'https://www.youtube.com/watch?v=61M2takIKl8',
        authorId: 4,
        title: "Introduction [1 of 8] | Beginner's Series to: Dev Containers",
        description:
          'Join Brigit Murtaugh to kick start your learning with developing in a Docker container in Visual Studio Code! Learn what it means to configure a container-based development environment, why you might want to develop in a container in VS Code, and what lies ahead in the rest of this video series.',
      },
      {
        url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
        authorId: 5,
        title: 'Turborepo in 2 Minutes',
        description:
          'How exactly does turbo make your tasks so fast? Matt Pocock (@mattpocockuk) explains (in two minutes or less 😅). Try Turborepo: https://vercel.fyi/tryturbo',
      },
      {
        url: 'https://www.youtube.com/watch?v=61M2takIKl8',
        authorId: 6,
        title: "Introduction [1 of 8] | Beginner's Series to: Dev Containers",
        description:
          'Join Brigit Murtaugh to kick start your learning with developing in a Docker container in Visual Studio Code! Learn what it means to configure a container-based development environment, why you might want to develop in a container in VS Code, and what lies ahead in the rest of this video series.',
      },
      {
        url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
        authorId: 7,
        title: 'Turborepo in 2 Minutes',
        description:
          'How exactly does turbo make your tasks so fast? Matt Pocock (@mattpocockuk) explains (in two minutes or less 😅). Try Turborepo: https://vercel.fyi/tryturbo',
      },
      {
        url: 'https://www.youtube.com/watch?v=61M2takIKl8',
        authorId: 8,
        title: "Introduction [1 of 8] | Beginner's Series to: Dev Containers",
        description:
          'Join Brigit Murtaugh to kick start your learning with developing in a Docker container in Visual Studio Code! Learn what it means to configure a container-based development environment, why you might want to develop in a container in VS Code, and what lies ahead in the rest of this video series.',
      },
      {
        url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
        authorId: 9,
        title: 'Turborepo in 2 Minutes',
        description:
          'How exactly does turbo make your tasks so fast? Matt Pocock (@mattpocockuk) explains (in two minutes or less 😅). Try Turborepo: https://vercel.fyi/tryturbo',
      },
      {
        url: 'https://www.youtube.com/watch?v=61M2takIKl8',
        authorId: 10,
        title: "Introduction [1 of 8] | Beginner's Series to: Dev Containers",
        description:
          'Join Brigit Murtaugh to kick start your learning with developing in a Docker container in Visual Studio Code! Learn what it means to configure a container-based development environment, why you might want to develop in a container in VS Code, and what lies ahead in the rest of this video series.',
      },
      {
        url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
        authorId: 10,
        title: 'Turborepo in 2 Minutes',
        description:
          'How exactly does turbo make your tasks so fast? Matt Pocock (@mattpocockuk) explains (in two minutes or less 😅). Try Turborepo: https://vercel.fyi/tryturbo',
      },
      {
        url: 'https://www.youtube.com/watch?v=61M2takIKl8',
        authorId: 9,
        title: "Introduction [1 of 8] | Beginner's Series to: Dev Containers",
        description:
          'Join Brigit Murtaugh to kick start your learning with developing in a Docker container in Visual Studio Code! Learn what it means to configure a container-based development environment, why you might want to develop in a container in VS Code, and what lies ahead in the rest of this video series.',
      },
      {
        url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
        authorId: 8,
        title: 'Turborepo in 2 Minutes',
        description:
          'How exactly does turbo make your tasks so fast? Matt Pocock (@mattpocockuk) explains (in two minutes or less 😅). Try Turborepo: https://vercel.fyi/tryturbo',
      },
      {
        url: 'https://www.youtube.com/watch?v=61M2takIKl8',
        authorId: 7,
        title: "Introduction [1 of 8] | Beginner's Series to: Dev Containers",
        description:
          'Join Brigit Murtaugh to kick start your learning with developing in a Docker container in Visual Studio Code! Learn what it means to configure a container-based development environment, why you might want to develop in a container in VS Code, and what lies ahead in the rest of this video series.',
      },
      {
        url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
        authorId: 6,
        title: 'Turborepo in 2 Minutes',
        description:
          'How exactly does turbo make your tasks so fast? Matt Pocock (@mattpocockuk) explains (in two minutes or less 😅). Try Turborepo: https://vercel.fyi/tryturbo',
      },
      {
        url: 'https://www.youtube.com/watch?v=61M2takIKl8',
        authorId: 5,
        title: "Introduction [1 of 8] | Beginner's Series to: Dev Containers",
        description:
          'Join Brigit Murtaugh to kick start your learning with developing in a Docker container in Visual Studio Code! Learn what it means to configure a container-based development environment, why you might want to develop in a container in VS Code, and what lies ahead in the rest of this video series.',
      },
      {
        url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
        authorId: 4,
        title: 'Turborepo in 2 Minutes',
        description:
          'How exactly does turbo make your tasks so fast? Matt Pocock (@mattpocockuk) explains (in two minutes or less 😅). Try Turborepo: https://vercel.fyi/tryturbo',
      },
      {
        url: 'https://www.youtube.com/watch?v=61M2takIKl8',
        authorId: 3,
        title: "Introduction [1 of 8] | Beginner's Series to: Dev Containers",
        description:
          'Join Brigit Murtaugh to kick start your learning with developing in a Docker container in Visual Studio Code! Learn what it means to configure a container-based development environment, why you might want to develop in a container in VS Code, and what lies ahead in the rest of this video series.',
      },
      {
        url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
        authorId: 2,
        title: 'Turborepo in 2 Minutes',
        description:
          'How exactly does turbo make your tasks so fast? Matt Pocock (@mattpocockuk) explains (in two minutes or less 😅). Try Turborepo: https://vercel.fyi/tryturbo',
      },
      {
        url: 'https://www.youtube.com/watch?v=61M2takIKl8',
        authorId: 1,
        title: "Introduction [1 of 8] | Beginner's Series to: Dev Containers",
        description:
          'Join Brigit Murtaugh to kick start your learning with developing in a Docker container in Visual Studio Code! Learn what it means to configure a container-based development environment, why you might want to develop in a container in VS Code, and what lies ahead in the rest of this video series.',
      },
    ],
  });
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
