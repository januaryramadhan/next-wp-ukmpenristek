import { Client } from "@notionhq/client";

if (!process.env.NOTION_TOKEN) {
  throw new Error('NOTION_TOKEN is not defined');
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getNotionClient = () => notion;