export default function Inicio() {
    const parrafo = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit facere vitae iste? Nulla maxime molestiae quas cupiditate earum iure voluptates aspernatur quam minus quod expedita ratione ullam, beatae, aliquid aperiam."
    return (
        <div className="p-4 rounded">
            <h1 className="display-4 p-md-2 rounded bg-body-secondary">Incidentes viales del Partido de Coronel Rosales</h1>
            <p className="lead my-3">{parrafo.repeat(5)}</p>
        </div>
    )
};