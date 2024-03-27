export const post = async (name, mark, priority, description, id = '', option:string) => {
    const date = Date.now()
    const response: Response = await fetch(`http://localhost:5000/api/card/${id}`, {
        method: option,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {name,date, mark, priority, description} ),
    })
    return response
}
export const deleteRequest = async (id) => {
    const response: Response = await fetch(`http://localhost:5000/api/card/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    return response
}