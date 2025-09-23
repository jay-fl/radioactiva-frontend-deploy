import React from 'react'
import { SongsResponseSchema } from '../../src/schemas'
import SongCard from '@/components/songs/SongCard'

async function getSongs() {
	const url = `${process.env.API_URL}/songs`
	const req = await fetch(url)
	const json = await req.json()
	const data = SongsResponseSchema.parse(json)
	return {
		songs: data.songs,
		total: data.total,
	}
}
export default async function RankingPage() {
	const song = await getSongs()

	return (
		<div>
			<div>
				{song.songs.map((cancion) => (
					<SongCard key={cancion.id} cancion={cancion} />
				))}
			</div>
		</div>
	)
}
