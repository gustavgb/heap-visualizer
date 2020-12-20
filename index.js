window.render = function render (e) {
  e.preventDefault()
  const canvas = document.getElementById('can')
  const ctx = canvas.getContext('2d')

  const numbers = e.target[0].value.split(',').map(function (part) {
    return parseInt(part, 10)
  })

  const layers = Math.ceil(Math.log2(numbers.length))
  const leaves = Math.pow(2, layers)

  const width = leaves * 40 + 100
  const height = layers * 100 + 100

  canvas.width = width
  canvas.height = height

  const items = numbers.map(function (number, index) {
    const layer = Math.floor(Math.log2(index + 1)) + 1
    const itemsInLayer = Math.pow(2, layer - 1)
    const placeInLayer = index - itemsInLayer + 1

    const spacing = (width - 200) / itemsInLayer

    const x = width / 2 - ((itemsInLayer - 1) / 2 - placeInLayer) * spacing
    const y = layer * 100

    return {
      x,
      y,
      label: number
    }
  })

  ctx.strokeStyle = 'black'
  ctx.lineWidth = Math.max(1, width / 500)
  ctx.beginPath()
  for (let i = 2; i < items.length + 1; i++) {
    const parent = items[Math.floor(i / 2) - 1]
    const child = items[i - 1]

    ctx.moveTo(parent.x, parent.y)
    ctx.lineTo(child.x, child.y)
  }
  ctx.stroke()

  for (const item of items) {
    ctx.beginPath()
    ctx.arc(item.x, item.y, 30, 0, 2 * Math.PI, false)
    ctx.fillStyle = '#ccc'
    ctx.fill()

    ctx.fillStyle = '#000'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.font = '20px sans-serif'
    ctx.fillText(item.label, item.x, item.y)
  }
}
