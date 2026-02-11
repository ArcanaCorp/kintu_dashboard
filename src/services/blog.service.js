import { supabase } from "@/libs/supabase";

export const getBlogs = async () => {
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order("created_at", { ascending: false });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Get blogs error:", error);
        throw error;
    }
}
// util simple para slug
export const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

export async function createBlog(formData) {
    
    const { titulo, category, summary, content, slug, cover, published } = formData

    if (!titulo || !category || !content) {
        throw new Error('Datos obligatorios incompletos')
    }

    const { data, error } = await supabase
        .from('blogs')
        .insert([
            {
                titulo,
                slug,
                category,
                summary,
                content,
                cover,
                published,
            },
        ])
        .select()
        .single()

    if (error) {
        console.error('Error creando blog:', error)
        throw error
    }

    return data
}

export async function updateBlog(formData) {

    const { id, titulo, category, summary, content, cover, slug, published } = formData

    if (!id || !slug) {
        throw new Error('ID y slug son obligatorios para actualizar el blog')
    }

    let coverUrl = cover

    // 👉 Si el cover es un File, lo reemplazamos
    if (cover instanceof File) {
        coverUrl = await uploadCoverImage({
            file: cover,
            slug,
        })
    }

    const { data, error } = await supabase
        .from('blogs')
        .update({
            titulo,
            category,
            summary,
            content,
            published,
            cover: coverUrl,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error actualizando blog:', error)
        throw error
    }

    return data
}

export const deleteBlog = async (id) => {
    try {
        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq("id", id);

        if (error) throw error;

        return id;
    } catch (error) {
        console.error("Delete blogs error:", error);
        throw error;
    }
}

export const uploadCoverImage = async ({file, slug}) => {
    try {
        if (!file || !slug) {
            throw new Error('File y slug son obligatorios')
        }
        const fileExt = file.name.split('.').pop()
        const fileName = `${crypto.randomUUID()}.${fileExt}`
        const filePath = `${slug}/${fileName}`

        const { error } = await supabase.storage
            .from('blog')
            .upload(filePath, file, {
                upsert: true
            })

        if (error) throw error

        const { data } = supabase.storage
            .from('blog')
            .getPublicUrl(filePath)

        return data.publicUrl
    } catch (error) {
        console.error(error);
    }
}