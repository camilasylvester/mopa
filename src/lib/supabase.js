import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://sjckebychgcclateitqr.supabase.co',
  'sb_publishable_TRzNj4K8qyWZEW-sdA0MGg_4M5KqZYB'
)

// Nombre de la tabla en Supabase — cambiá si es diferente
export const TABLE = 'registros'
