import { Request, Response } from 'express';
import { subscribedPost } from '../_utils/middleware';
import { getProExampleContent } from '../_utils/github';

async function downloadProExample(req: Request, res: Response, { userId }: { userId: string }) {
  const { id, framework } = req.body;

  if (!id || !framework) {
    return res.status(500).send({ message: 'Bad request.' });
  }

  const files = await getProExampleContent(id);

  return res.status(200).json({ timestamp: Date.now(), files });
}

export default subscribedPost(downloadProExample);
