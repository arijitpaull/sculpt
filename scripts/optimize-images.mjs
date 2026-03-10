/**
 * One-time image compression script for SCULPT website.
 * Compresses all PNGs in public/images/ to reduce payload from ~103MB to ~8MB.
 * Run with: node scripts/optimize-images.mjs
 */
import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const IMAGES_DIR = join(__dirname, '..', 'public', 'images')

async function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)}MB`
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)}KB`
  return `${bytes}B`
}

async function compressPng(filePath) {
  const original = await stat(filePath)
  const name = basename(filePath)

  try {
    const buffer = await sharp(filePath)
      .png({ quality: 80, compressionLevel: 9, progressive: true })
      .toBuffer()

    if (buffer.length < original.size) {
      const { writeFile } = await import('fs/promises')
      await writeFile(filePath, buffer)
      const saved = original.size - buffer.length
      const pct = ((saved / original.size) * 100).toFixed(0)
      console.log(`✓ ${name}: ${await formatSize(original.size)} → ${await formatSize(buffer.length)} (-${pct}%)`)
      return { saved, name }
    } else {
      console.log(`- ${name}: already optimal (${await formatSize(original.size)})`)
      return { saved: 0, name }
    }
  } catch (err) {
    console.warn(`✗ ${name}: skipped (${err.message})`)
    return { saved: 0, name }
  }
}

async function main() {
  console.log('🗜  SCULPT image optimizer\n')
  const files = await readdir(IMAGES_DIR)
  const pngs = files.filter(f => extname(f).toLowerCase() === '.png')

  console.log(`Found ${pngs.length} PNG files in public/images/\n`)

  let totalSaved = 0
  for (const file of pngs) {
    const filePath = join(IMAGES_DIR, file)
    const result = await compressPng(filePath)
    totalSaved += result.saved
  }

  console.log(`\nDone. Total saved: ${await formatSize(totalSaved)}`)
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
