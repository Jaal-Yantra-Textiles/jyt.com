import { NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export const config = {
  matcher: ['/'],
}

export async function middleware(req: NextRequest) {
  try {
    // Check whether the maintenance page should be shown
    const isInMaintenanceMode = await get<boolean>('down')

    // If is in maintenance mode, point the url pathname to the maintenance page
    if (isInMaintenanceMode) {
      req.nextUrl.pathname = `/down`

      // Rewrite to the url
      return NextResponse.rewrite(req.nextUrl)
    }
  } catch (error) {
    // show the default page if EDGE_CONFIG env var is missing,
    // but log the error to the console
    console.error(error)
  }
}