export const postEmail = async (email: string): Promise<boolean> => {
  const response = await fetch(`/api/email`, {
    method: 'POST',
    body: JSON.stringify(email),
    headers: { 'Content-Type': 'application/json' },
  })

  return response.ok
}
