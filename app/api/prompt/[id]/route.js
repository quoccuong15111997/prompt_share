import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (req, { params }) => {
  try {

    await connectToDB();

    const data = await Prompt.findById(params.id).populate("creator");

    if (!data) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    });

  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }
};
// PATH (update)

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const exitingPrompt = await Prompt.findById(params.id);

    if (!exitingPrompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    exitingPrompt.prompt = prompt;
    exitingPrompt.tag = tag;

    await exitingPrompt.save();

    return new Response(JSON.stringify(exitingPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {

    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Delete successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }
};
