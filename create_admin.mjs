
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://buunxqqekqsiwkjhtwkq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dW54cXFla3FzaXdramh0d2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NTczMDgsImV4cCI6MjA4NTQzMzMwOH0.WDH8jEc3Gappvi05tgYmV0eRgrao09FDUlpcQ-Fp_7A'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdmin() {
    const email = 'admin@casafacil.com'
    const password = 'admin123'

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: 'Administrador',
                phone: '+258840000000',
                accepted_terms: true
            }
        }
    })

    if (error) {
        console.error('Error creating user:', error.message)
    } else {
        console.log('User created via Auth ID:', data.user?.id)
    }
}

createAdmin()
