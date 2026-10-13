// Nota do produto, usada no card e na página do produto
export default function Avaliacao({ rating }) {
  if (rating.count === 0) {
    return (
      <p className="card-avaliacao">
        <span>Sem avaliações ainda</span>
      </p>
    )
  }

  return (
    <p className="card-avaliacao">
      ★ {rating.rate} <span>({rating.count} avaliações)</span>
    </p>
  )
}
