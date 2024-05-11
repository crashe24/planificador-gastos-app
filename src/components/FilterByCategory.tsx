import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

function FilterByCategory() {
    const {dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        dispatch({type:'add-filter-category', payload:{id:e.target.value}})
    }
  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form className=''>
        <div className='flex flex-col md:flex-row md:items-center gap-5'>
        <label htmlFor='category'>Filtrar gasto</label>
        <select id='category' className='bg-slate-100 p-5 flex-1 rounded text-xl'
        onChange={handleChange}>
            <option value=''>--todas las categorias--</option>
            {categories.map(cat => (
                <option value={cat.id} key={cat.id}>
                    {cat.name}
                </option>
            ))}
        </select>

        </div>
      </form>
    </div>
  );
}

export default FilterByCategory;
