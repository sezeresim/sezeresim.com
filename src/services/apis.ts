import { IPost } from '@/interfaces'

export const getPosts = async () => {
  try {
    const res = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sezeresim'
    )
    let results = await res.json()
    results = results.items.map(
      (item: any): IPost => ({
        title: item.title,
        description: item.description,
        thumbnail: item.thumbnail,
        author: item.author,
        pubDate: item.pubDate,
        id: item.guid.split('https://medium.com/p/')[1],
      })
    )
    return results
  } catch (error) {
    console.log('getPosts ~ error', error)
    return []
  }
}

export const getPostById = async (id: string | number) => {
  try {
    const results = await getPosts()
    return results.find((el: any) => el.id === id)
  } catch (error) {
    console.log('getPostById ~ error', error)
    throw new Error("Can't get post by id")
  }
}
