import { NextPage } from 'next'
import EditNotebook from '../../../components/EditNotebook'
import { Header } from '../../../components/Header'

const AddNotebookPage: NextPage = () => {
  return (
    <>
      <Header />
      <EditNotebook />
    </>
  )
}

export default AddNotebookPage
