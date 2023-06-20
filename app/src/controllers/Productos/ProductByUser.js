const categorias = require('../../models/Categoria');

const ProductByUser =async()=>{
    console.log('entro');
    const result = await categorias.aggregate(
        [
            {
                $lookup:{
                    from:"productos",
                    let:{
                        usuario:"$nombre"
                    },
                    pipeline:[{
                        $match:{
                            $expr:{
                                $in:["$$usuario","$categorias"]
                            }
                        }
                    }],
                    as: "productos"
                }
            }
        ]
    )
    console.log( result);
    return result;
}

module.exports = {ProductByUser}