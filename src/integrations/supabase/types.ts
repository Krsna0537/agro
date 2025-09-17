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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string
          created_by: string
          expires_at: string | null
          farm_type: Database["public"]["Enums"]["farm_type"] | null
          id: string
          is_active: boolean
          location: string | null
          message: string
          severity: Database["public"]["Enums"]["alert_severity"]
          title: string
        }
        Insert: {
          created_at?: string
          created_by: string
          expires_at?: string | null
          farm_type?: Database["public"]["Enums"]["farm_type"] | null
          id?: string
          is_active?: boolean
          location?: string | null
          message: string
          severity?: Database["public"]["Enums"]["alert_severity"]
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          expires_at?: string | null
          farm_type?: Database["public"]["Enums"]["farm_type"] | null
          id?: string
          is_active?: boolean
          location?: string | null
          message?: string
          severity?: Database["public"]["Enums"]["alert_severity"]
          title?: string
        }
        Relationships: []
      }
      biosecurity_assessments: {
        Row: {
          assessment_data: Json
          assessor_id: string
          completed_at: string | null
          created_at: string
          farm_id: string
          id: string
          recommendations: string | null
          risk_score: number | null
          status: Database["public"]["Enums"]["assessment_status"]
          updated_at: string
        }
        Insert: {
          assessment_data?: Json
          assessor_id: string
          completed_at?: string | null
          created_at?: string
          farm_id: string
          id?: string
          recommendations?: string | null
          risk_score?: number | null
          status?: Database["public"]["Enums"]["assessment_status"]
          updated_at?: string
        }
        Update: {
          assessment_data?: Json
          assessor_id?: string
          completed_at?: string | null
          created_at?: string
          farm_id?: string
          id?: string
          recommendations?: string | null
          risk_score?: number | null
          status?: Database["public"]["Enums"]["assessment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "biosecurity_assessments_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_records: {
        Row: {
          checked_at: string
          checked_by: string
          checklist_item: string
          created_at: string
          evidence_url: string | null
          farm_id: string
          id: string
          is_compliant: boolean
          notes: string | null
        }
        Insert: {
          checked_at?: string
          checked_by: string
          checklist_item: string
          created_at?: string
          evidence_url?: string | null
          farm_id: string
          id?: string
          is_compliant?: boolean
          notes?: string | null
        }
        Update: {
          checked_at?: string
          checked_by?: string
          checklist_item?: string
          created_at?: string
          evidence_url?: string | null
          farm_id?: string
          id?: string
          is_compliant?: boolean
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_records_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          animal_count: number | null
          coordinates: unknown | null
          created_at: string
          farm_type: Database["public"]["Enums"]["farm_type"]
          id: string
          location: string
          name: string
          owner_id: string
          registration_number: string | null
          size_hectares: number | null
          updated_at: string
        }
        Insert: {
          animal_count?: number | null
          coordinates?: unknown | null
          created_at?: string
          farm_type: Database["public"]["Enums"]["farm_type"]
          id?: string
          location: string
          name: string
          owner_id: string
          registration_number?: string | null
          size_hectares?: number | null
          updated_at?: string
        }
        Update: {
          animal_count?: number | null
          coordinates?: unknown | null
          created_at?: string
          farm_type?: Database["public"]["Enums"]["farm_type"]
          id?: string
          location?: string
          name?: string
          owner_id?: string
          registration_number?: string | null
          size_hectares?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
          location: string | null
          organization: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          location?: string | null
          organization?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          location?: string | null
          organization?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      training_modules: {
        Row: {
          content: Json
          created_at: string
          created_by: string
          description: string | null
          duration_minutes: number | null
          farm_type: Database["public"]["Enums"]["farm_type"] | null
          id: string
          is_published: boolean
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          created_by: string
          description?: string | null
          duration_minutes?: number | null
          farm_type?: Database["public"]["Enums"]["farm_type"] | null
          id?: string
          is_published?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          created_by?: string
          description?: string | null
          duration_minutes?: number | null
          farm_type?: Database["public"]["Enums"]["farm_type"] | null
          id?: string
          is_published?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_alerts: {
        Row: {
          alert_id: string
          created_at: string
          id: string
          read_at: string | null
          user_id: string
        }
        Insert: {
          alert_id: string
          created_at?: string
          id?: string
          read_at?: string | null
          user_id: string
        }
        Update: {
          alert_id?: string
          created_at?: string
          id?: string
          read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_alerts_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_training_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          module_id: string
          progress_percentage: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          module_id: string
          progress_percentage?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          module_id?: string
          progress_percentage?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_training_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      alert_severity: "low" | "medium" | "high" | "critical"
      app_role:
        | "farmer"
        | "veterinarian"
        | "extension_worker"
        | "regulator"
        | "researcher"
      assessment_status: "draft" | "completed" | "reviewed"
      farm_type: "pig" | "poultry" | "mixed"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_severity: ["low", "medium", "high", "critical"],
      app_role: [
        "farmer",
        "veterinarian",
        "extension_worker",
        "regulator",
        "researcher",
      ],
      assessment_status: ["draft", "completed", "reviewed"],
      farm_type: ["pig", "poultry", "mixed"],
    },
  },
} as const
