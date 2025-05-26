import { randomUUID } from 'node:crypto'
import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'

import { stringify } from 'csv-stringify'

import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schema'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'

export async function exportLinks() {
  const { sql, params } = db.select().from(schema.links).toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(1)

  const csv = stringify({
    header: true,
    delimiter: ',',
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'Original URL' },
      { key: 'short_url_slug', header: 'Short URL' },
      { key: 'access_count', header: 'Access Count' },
      { key: 'created_at', header: 'Created At' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], _, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }

        callback()
      },
    }),
    csv,
    uploadToStorageStream,
  )

  const uploadToStorage = uploadFileToStorage({
    fileName: `links-${randomUUID()}.csv`,
    contentType: 'text/csv',
    contentStream: uploadToStorageStream,
  })

  const [, { url }] = await Promise.all([convertToCSVPipeline, uploadToStorage])

  return {
    reportUrl: url,
  }
}
