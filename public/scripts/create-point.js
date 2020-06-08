// Entidade
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  citySelect.innerHTML = "<option>Selecione a Cidade</option>"
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });

}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

// Itens Coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")
const collectedItems = document.querySelector("input[name=items]")

for(const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []

function handleSelectedItem (event) {
  const itemLi = event.target;

  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id;

  // verificar se existem itens selecionadas, se sim pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item === itemId // poderá ser verdadeiro ou falso
    return itemFound
  })

  // se já estiver selecionado, tirar da seleção
  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId // false
      return itemIsDifferent
    })

    selectedItems = filteredItems
  } else {
    // se não estiver selecionado, adicionar a seleção
    selectedItems.push(itemId)
  }

  // atualizar o campo escondido com os itens selecionados
  collectedItems.value = selectedItems
}
