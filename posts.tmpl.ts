const Requests = {
    REST_URL: "https://dev.bocoup.com/wp-json/wp/v2"
}

export const layout = "layouts/post.njk";
export default async function* () {
    const posts = await getPosts()
    for (const post of posts) {
        yield {
          url: `/posts/${post.slug}/`,
          title: post.title.rendered,
          body: post.content.rendered,
          type: "posts",
          tags: post.tags.map(tag => tag.name)
          //...post,
        };
      }
}

async function getPosts(): Promise<Array<Post>> {
    let page = 1;
    let result = {} as Response;
    let posts = [] as Post[];
  
    while (result.status != 400) {
      result = await fetch(
        Requests.REST_URL + `/posts?per_page=100&page=${page}`
      );
      if (result.status != 200) {
        break;
      }
      const response = (await result.json()) as Post[];
      posts.push(...response);
      page++;
    }
  
    const tags = await getTags();
  
    posts.forEach(post => {
      const postTagIds = post.tags
      const postTags = tags.filter(tag => postTagIds.includes(tag.id))
      post.tags = postTags;
    })
  
    return posts;
  }

  async function getTags(): Promise<Array<Tag>> {
    let page = 1;
    let result = {} as Response;
    let tags = [] as Tag[];
  
    while (result.status != 400) {
      result = await fetch(
        Requests.REST_URL + `/tags?per_page=100&hide_empty=true&page=${page}`
      );
      if (result.status != 200) {
        break;
      }
      const response = (await result.json()) as Tag[];
      if (response.length < 1) {
        break;
      }
      tags.push(...response);
      page++;
    }
  
    return tags;
  }
  

  export interface Title {
    rendered: string;
}

export interface Content {
    rendered: string;
    protected: boolean;
}

export interface Excerpt {
    rendered: string;
    protected: boolean;
}

export interface Cell {
    content: string;
    tag: string;
    scope: string;
    align: string;
}

export interface Body {
    cells: Cell[];
}

export interface Attrs {
    hasFixedLayout: boolean;
    caption: string;
    head: any[];
    body: Body[];
    foot: any[];
    lock: any[];
    align: string;
    style: any[];
    borderColor: string;
    backgroundColor: string;
    textColor: string;
    gradient: string;
    className: string;
    fontSize: string;
    fontFamily: string;
    anchor: string;
}

export interface Block {
    blockName: string;
    attrs: Attrs;
    innerBlocks: any[];
    innerHTML: string;
    innerContent: string[];
    rendered: string;
}

export interface Self {
    href: string;
}

export interface Collection {
    href: string;
}

export interface About {
    href: string;
}

export interface Author {
    embeddable: boolean;
    href: string;
}

export interface Reply {
    embeddable: boolean;
    href: string;
}

export interface VersionHistory {
    count: number;
    href: string;
}

export interface PredecessorVersion {
    id: number;
    href: string;
}

export interface WpAttachment {
    href: string;
}

export interface WpTerm {
    taxonomy: string;
    embeddable: boolean;
    href: string;
}

export interface Cury {
    name: string;
    href: string;
    templated: boolean;
}

export interface Links {
    self: Self[];
    collection: Collection[];
    about: About[];
    author: Author[];
    replies: Reply[];
    versionHistory: VersionHistory[];
    predecessorVersion: PredecessorVersion[];
    wpAttachment: WpAttachment[];
    wpTerm: WpTerm[];
    curies: Cury[];
}

export interface Post {
    id: number;
    date: Date;
    date_gmt: Date;
    modified: Date;
    modified_gmt: Date;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: Title;
    content: Content;
    excerpt: Excerpt;
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: any[];
    categories: number[];
    tags: any[];
    has_blocks: boolean;
    blocks: Block[];
    _links: Links;
}


export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}

export interface About {
  href: string;
}

export interface WpPostType {
  href: string;
}

export interface Cury {
  name: string;
  href: string;
  templated: boolean;
}

export interface Links {
  self: Self[];
  collection: Collection[];
  about: About[];
  wp_post_type: WpPostType[];
  curies: Cury[];
}

export interface Tag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta: any[];
  _links: Links;
}