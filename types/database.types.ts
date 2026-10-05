export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      properties: {
        Row: {
          area: number
          badge: string | null
          badge_type: string | null
          baths: number
          beds: number
          category: string
          created_at: string
          id: string
          image_alt: string
          image_url: string
          is_featured: boolean
          location: string
          price: number
          price_formatted: string
          price_period: string | null
          slug: string
          title: string
          type: string
          updated_at: string
          images?: string[] | null
          description?: string | null
          amenities?: string[] | null
          garages?: number | null
          latitude?: number | null
          longitude?: number | null
          agent_name?: string | null
          agent_title?: string | null
          agent_avatar?: string | null
        }
        Insert: {
          area: number
          badge?: string | null
          badge_type?: string | null
          baths: number
          beds: number
          category: string
          created_at?: string
          id?: string
          image_alt: string
          image_url: string
          is_featured?: boolean
          location: string
          price: number
          price_formatted: string
          price_period?: string | null
          slug: string
          title: string
          type: string
          updated_at?: string
          images?: string[] | null
          description?: string | null
          amenities?: string[] | null
          garages?: number | null
          latitude?: number | null
          longitude?: number | null
          agent_name?: string | null
          agent_title?: string | null
          agent_avatar?: string | null
        }
        Update: {
          area?: number
          badge?: string | null
          badge_type?: string | null
          baths?: number
          beds?: number
          category?: string
          created_at?: string
          id?: string
          image_alt?: string
          image_url?: string
          is_featured?: boolean
          location?: string
          price?: number
          price_formatted?: string
          price_period?: string | null
          slug?: string
          title?: string
          type?: string
          updated_at?: string
          images?: string[] | null
          description?: string | null
          amenities?: string[] | null
          garages?: number | null
          latitude?: number | null
          longitude?: number | null
          agent_name?: string | null
          agent_title?: string | null
          agent_avatar?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never
