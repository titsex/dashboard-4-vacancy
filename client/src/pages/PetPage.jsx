const PetPage = () => {
    return <h1>Pet Page</h1>
}

const PetPageRoute = {
    path: '/pets',
    id: 'Pets',
    element: <PetPage />,
}

export { PetPage, PetPageRoute }
