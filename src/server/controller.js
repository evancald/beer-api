let data = [];

let id = 0;

module.exports = {
  create: (req, res) => {
    const {name, tagline, abv, description} = req.body;
    data.unshift({id, name, tagline, abv, description});
    id++;
    res.status(200).send(data);
  },
  read: (req, res) => {
    res.status(200).send(data);
  },
  update: (req, res) => {
    let index = null;
    data.forEach((beer, i) => {
      if(beer.id == Number(req.params.id)) index = i;
    })
    data[index] = {
      id: Number(req.params.id),
      name: req.body.name || data[index].name,
      tagline: req.body.tagline || data[index].tagline,
      abv: req.body.abv || data[index].abv,
      description: req.body.description || data[index].description
    }
    res.status(200).send(data);
  },
  delete: (req, res) => {
    let index = null;
    data.forEach((beer, i) => {
      if(beer.id == Number(req.params.id)) index = i;
    })
    data.splice(index, 1)
    res.status(200).send(data)
  }
}