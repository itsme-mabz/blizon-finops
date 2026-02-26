# Hygraph (GraphCMS) Setup Guide for Blog

Complete guide to set up Hygraph for the Blizon blog with real-time content updates.

## 1. Create Hygraph Account

1. Go to [https://hygraph.com](https://hygraph.com)
2. Sign up for a free account
3. Create a new project: **"Blizon Blog"**
4. Select region closest to your server (for faster API calls)

## 2. Create Content Models

### A. Author Model

1. Go to **Schema** → **Create Model**
2. Name: `Author`
3. API ID: `author` (auto-generated)
4. Add fields:

| Field Name | Type | Settings |
|------------|------|----------|
| Name | Single line text | Required |
| Bio | Multi-line text | Optional |
| Picture | Asset (Single) | Optional |

### B. Category Model

1. **Schema** → **Create Model**
2. Name: `Category`
3. API ID: `category`
4. Add fields:

| Field Name | Type | Settings |
|------------|------|----------|
| Name | Single line text | Required, Unique |
| Slug | Slug | Required, Unique, Generate from: Name |
| Description | Multi-line text | Optional |

### C. SEO Model (Component)

1. **Schema** → **Create Model** → Select **Component**
2. Name: `SEO`
3. API ID: `seo`
4. Add fields:

| Field Name | Type | Settings |
|------------|------|----------|
| Title | Single line text | Optional |
| Description | Multi-line text | Optional |
| Keywords | Single line text (List) | Optional |

### D. Post Model (Main Content)

1. **Schema** → **Create Model**
2. Name: `Post`
3. API ID: `post`
4. Add fields:

| Field Name | Type | Settings |
|------------|------|----------|
| Title | Single line text | Required |
| Slug | Slug | Required, Unique, Generate from: Title |
| Excerpt | Multi-line text | Required (for blog card preview) |
| Cover Image | Asset (Single) | Required |
| Content | Rich Text | Required (Enable all formatting options) |
| Published At | Date & Time | Required, Set default: Now |
| Updated At | Date & Time | Optional |
| Author | Reference | Required, Model: Author, Cardinality: One |
| Category | Reference | Required, Model: Category, Cardinality: One |
| Tags | Single line text | Optional, Make it a list |
| SEO | Component | Optional, Component: SEO |

## 3. Configure API Access

### A. Create Permanent Auth Token

1. Go to **Project Settings** → **API Access**
2. Under **Permanent Auth Tokens**, click **Create Token**
3. Name: `Production Token`
4. Permissions: Select **Read** for all content
5. Copy the token (you'll need this for `.env.local`)

### B. Get Content API URL

1. In **Project Settings** → **Endpoints**
2. Copy the **Content API** URL
3. It looks like: `https://api-region.hygraph.com/v2/your-project-id/master`

## 4. Configure Environment Variables

Create `.env.local` file in your project root:

```bash
NEXT_PUBLIC_HYGRAPH_URL=https://api-region.hygraph.com/v2/your-project-id/master
HYGRAPH_TOKEN=your-permanent-auth-token-here
```

**Important**: Add `.env.local` to `.gitignore` (already done)

## 5. Create Initial Content

### A. Create Authors

1. Go to **Content** → **Authors** → **Create Entry**
2. Add yourself or team members:
   - Name: "John Doe"
   - Bio: "FinOps engineer with 10+ years experience..."
   - Picture: Upload profile photo
3. **Publish** the entry

### B. Create Categories

Create these categories:

1. **FinOps**
   - Slug: `finops`
   - Description: "Financial Operations and cloud cost optimization"

2. **Cloud Optimization**
   - Slug: `cloud-optimization`
   - Description: "Tips for reducing AWS, GCP, and cloud costs"

3. **Engineering**
   - Slug: `engineering`
   - Description: "Software engineering best practices"

4. **DevOps**
   - Slug: `devops`
   - Description: "DevOps tools, processes, and automation"

### C. Create Your First Blog Post

1. Go to **Content** → **Posts** → **Create Entry**
2. Fill in the fields:
   - **Title**: "How We Reduced AWS Costs by 40% in 30 Days"
   - **Slug**: Auto-generated from title
   - **Excerpt**: "A case study on how we helped a Series A startup..."
   - **Cover Image**: Upload a relevant image
   - **Content**: Write your blog post (Rich Text editor)
   - **Published At**: Select date/time
   - **Author**: Select from dropdown
   - **Category**: Select "FinOps"
   - **Tags**: Add tags like `aws`, `cost-optimization`, `case-study`
   - **SEO** (optional):
     - Title: "How We Reduced AWS Costs by 40%"
     - Description: "Case study on AWS cost optimization..."
     - Keywords: `aws, cost optimization, finops`

3. Click **Save**
4. Click **Publish** (top right)

## 6. Test the Integration

### Local Development

```bash
# Start dev server
npm run dev

# Visit blog page
http://localhost:3001/blog

# Visit individual post
http://localhost:3001/blog/how-we-reduced-aws-costs-by-40-in-30-days
```

### Check if it's working:

- Blog listing page shows your post(s)
- Click on a post to see the full article
- Images display correctly
- Author info appears
- Category badge shows

## 7. Webhooks for Real-Time Updates (Optional but Recommended)

To get real-time updates when you publish content:

### A. In Hygraph

1. Go to **Project Settings** → **Webhooks**
2. Click **Create Webhook**
3. Settings:
   - Name: `Revalidate Blog`
   - URL: `https://blizon.tech/api/revalidate?secret=YOUR_SECRET_KEY`
   - Method: POST
   - Trigger: Select "Publish" for "Post" model
4. Save webhook

### B. Create Revalidation API Route

Create `app/api/revalidate/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');

  // Check secret to validate the request
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidate blog pages
    revalidatePath('/blog');
    revalidatePath('/blog/[slug]');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
```

Add to `.env.local`:
```bash
REVALIDATION_SECRET=your-random-secret-key-here
```

## 8. Content Guidelines

### Writing Blog Posts in Hygraph

1. **Title**: Clear, engaging, SEO-friendly
2. **Excerpt**: 2-3 sentences, under 200 characters
3. **Content**:
   - Use headings (H2, H3) for structure
   - Add images inline
   - Use code blocks for technical content
   - Add links where relevant
4. **Cover Image**: 1200x630px recommended (for social sharing)
5. **Tags**: 3-5 relevant tags
6. **SEO**: Fill for better search rankings

### Publishing Workflow

1. **Draft**: Create and save your post
2. **Review**: Preview in Hygraph
3. **Publish**: Click publish when ready
4. **Auto-Update**: Site updates within 60 seconds (ISR)
5. **Or Immediate**: If webhook is set up, updates instantly

## 9. Useful Hygraph Features

### Content Stages

- Use **Draft** stage for unpublished content
- Use **Published** stage for live content
- Schedule publishing for future dates

### Localization (if needed later)

- Add locales in Settings
- Translate content for multi-language support

### Asset Management

- Upload images directly in Hygraph
- Automatic image optimization
- CDN delivery for fast loading

## 10. Troubleshooting

### Blog page is empty

- Check if you've published any posts
- Verify environment variables are set
- Check Hygraph API permissions

### Images not loading

- Make sure images are published in Hygraph
- Check if asset URLs are accessible
- Verify Next.js image domains in config

### API errors

- Check your Hygraph token has read permissions
- Verify the API URL is correct
- Check Hygraph project status

### Content not updating

- Wait 60 seconds (ISR revalidation time)
- Or set up webhooks for instant updates
- Clear browser cache

## 11. Next Steps

Once blog is working:

1. **Create more content** - Build your content library
2. **Add analytics** - Track blog performance
3. **SEO optimization** - Monitor search rankings
4. **Newsletter integration** - Collect emails
5. **Social sharing** - Add share buttons
6. **Comments** - Consider adding Disqus/etc

## Resources

- [Hygraph Documentation](https://hygraph.com/docs)
- [Next.js ISR Guide](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating)
- [GraphQL Basics](https://graphql.org/learn/)

## Support

For issues:
1. Check Hygraph documentation
2. Review Next.js docs
3. Check application logs
4. Verify environment variables
