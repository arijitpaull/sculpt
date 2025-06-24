# SCULPT. Website - Content Management Guide

This guide explains how to easily manage all content on the SCULPT. website without touching component code.

## 📁 Data Files Structure

All content is managed through TypeScript files in the `/data` folder:

- `projects.ts` - All project information and case studies
- `testimonials.ts` - Client testimonials
- `social-links.ts` - Social media links and icons
- `site-config.ts` - General site configuration

## 🎨 Managing Projects

### Adding a New Project

1. Open `/data/projects.ts`
2. Add a new project object to the `projects` array:

\`\`\`typescript
{
  id: "5", // Unique ID
  title: "Your Project Name",
  category: "Project Type",
  description: "Short description for project cards",
  fullDescription: "Detailed description for case study page",
  image: "/path/to/main-image.jpg", // Fallback image
  challenge: "What was the main challenge?",
  solution: "How did you solve it?",
  results: "What were the outcomes?",
  technologies: ["React", "Node.js", "etc"],
  testimonial: {
    quote: "Client feedback",
    author: "Client Name, Title"
  },
  gallery: [
    "/path/to/hero-image.jpg", // First image used as main project image
    "/path/to/gallery-1.jpg",
    "/path/to/gallery-2.jpg",
    "/path/to/gallery-3.jpg"
  ]
}
\`\`\`

### Editing Existing Projects

Simply modify the relevant fields in the project object. The first image in the `gallery` array is automatically used as the main project image on both the homepage and case study page.

## 💬 Managing Testimonials

### Adding a New Testimonial

1. Open `/data/testimonials.ts`
2. Add to the `testimonials` array:

\`\`\`typescript
{
  id: "6", // Unique ID
  name: "Client Name",
  role: "Title, Company",
  content: "Testimonial text",
  avatar: "/path/to/avatar.jpg" // Optional
}
\`\`\`

## 🔗 Managing Social Links

### Adding/Editing Social Links

1. Open `/data/social-links.ts`
2. Modify existing links or add new ones:

\`\`\`typescript
{
  id: "twitter", // Unique ID
  name: "Twitter",
  url: "https://twitter.com/yourhandle",
  icon: "Twitter", // Must match icon component name
  ariaLabel: "Follow us on Twitter"
}
\`\`\`

### Available Icons

Current icons: `Instagram`, `Linkedin`, `Mail`, `FiverrLogo`

To add new icons:
1. Import the icon in `/app/page.tsx`
2. Add it to the `iconMap` object
3. Use the icon name in your social link

## ⚙️ Site Configuration

### Updating General Settings

Edit `/data/site-config.ts`:

\`\`\`typescript
export const siteConfig = {
  name: "SCULPT.", // Site name
  tagline: "Chiseling Visions into Apps", // Hero headline
  description: "Site description", // Hero subtitle
  heroVideo: "/videos/your-video.mp4", // Hero background video
  heroVideoFallback: "bg-gradient-to-br from-gray-900 via-gray-800 to-black", // Fallback if video fails
  logo: "/images/your-logo.png", // Site logo
  contact: {
    email: "your@email.com",
    phone: "+1 (555) 123-4567" // Optional
  },
  company: {
    name: "Your Company",
    foundedYear: 2020,
    location: "Your Location" // Optional
  }
}
\`\`\`

## 🎥 Changing the Hero Video

1. Add your new video file to `/public/videos/`
2. Update the `heroVideo` path in `/data/site-config.ts`
3. Optionally update the `heroVideoFallback` for when video fails to load

## 📸 Managing Images

### Project Images

- Place images in `/public/images/projects/`
- Update image paths in the project's `gallery` array
- First gallery image becomes the main project image automatically

### General Images

- Logo: Update path in `site-config.ts`
- Other images: Place in appropriate `/public/` subdirectories

## 🚀 Best Practices

1. **Image Optimization**: Use WebP format when possible
2. **Consistent Naming**: Use descriptive, kebab-case filenames
3. **Image Sizes**: Maintain consistent aspect ratios for project images
4. **Unique IDs**: Always use unique IDs for projects, testimonials, and social links
5. **Testing**: Test locally after making changes

## 📝 Content Guidelines

### Project Descriptions
- **Description**: 1-2 sentences for project cards
- **Full Description**: 2-3 sentences for case study intro
- **Challenge/Solution/Results**: 2-4 sentences each

### Testimonials
- Keep testimonials concise (1-3 sentences)
- Include client's full name and title
- Add company name when possible

### Image Requirements
- **Project Cards**: 800x1000px (4:5 aspect ratio)
- **Case Study Hero**: 1200x675px (16:9 aspect ratio)
- **Gallery Images**: 800x1200px or 1200x800px
- **Logo**: SVG or PNG with transparent background

This structure makes it easy to manage all content without touching any component code!
