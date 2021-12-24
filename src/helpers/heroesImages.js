import requireContext from 'require-context.macro';

const heroContext = requireContext('../assets/heroes', true);

// try {
//     heroContext = require.context('../assets/heroes', true, /\.jpg$/);
// } catch (error) {
//     console.warn('Cacho el error');
// }


export const heroeImages = (id) => {
    return heroContext(`./${id}.jpg`).default;
}