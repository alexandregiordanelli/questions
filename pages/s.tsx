import { supabase } from 'lib/supabase-client'
import { Question } from 'lib/types'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Page: NextPage = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Question[]>([])

  const getSearch = async (_search): Promise<void> => {
    const { data } = await supabase
      .from<Question>('Question')
      .select('*')
      .textSearch('text', _search, {
        type: 'websearch',
      })

    setResults(data)
  }

  useEffect(() => {
    if (search.length > 3) getSearch(search)
    else setResults([])
  }, [search])

  return (
    <>
      <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
      {results?.map((x) => {
        return <li key={x.id}>{x.text}</li>
      })}
    </>
  )
}

export default Page
