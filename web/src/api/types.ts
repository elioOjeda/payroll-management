export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      app_user: {
        Row: {
          company_id: string | null
          created_at: string | null
          created_by: string | null
          disabled_at: string | null
          disabled_by: string | null
          email: string
          first_name: string | null
          id: string
          is_admin: boolean
          is_disabled: boolean
          is_super_admin: boolean
          last_name: string | null
          type: Database["public"]["Enums"]["user_type"]
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          disabled_at?: string | null
          disabled_by?: string | null
          email: string
          first_name?: string | null
          id: string
          is_admin?: boolean
          is_disabled?: boolean
          is_super_admin?: boolean
          last_name?: string | null
          type?: Database["public"]["Enums"]["user_type"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          disabled_at?: string | null
          disabled_by?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_admin?: boolean
          is_disabled?: boolean
          is_super_admin?: boolean
          last_name?: string | null
          type?: Database["public"]["Enums"]["user_type"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_user_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_user_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_user_disabled_by_fkey"
            columns: ["disabled_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_user_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_user_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      child: {
        Row: {
          company_id: string
          created_at: string | null
          created_by: string | null
          disabled_at: string | null
          disabled_by: string | null
          employee_id: string
          first_name: string
          id: string
          is_disabled: boolean
          last_name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          created_by?: string | null
          disabled_at?: string | null
          disabled_by?: string | null
          employee_id: string
          first_name: string
          id?: string
          is_disabled?: boolean
          last_name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          disabled_at?: string | null
          disabled_by?: string | null
          employee_id?: string
          first_name?: string
          id?: string
          is_disabled?: boolean
          last_name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "child_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "child_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "child_disabled_by_fkey"
            columns: ["disabled_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "child_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "child_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      company: {
        Row: {
          created_at: string | null
          created_by: string | null
          disabled_at: string | null
          disabled_by: string | null
          id: string
          is_disabled: boolean
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          disabled_at?: string | null
          disabled_by?: string | null
          id?: string
          is_disabled?: boolean
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          disabled_at?: string | null
          disabled_by?: string | null
          id?: string
          is_disabled?: boolean
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_disabled_by_fkey"
            columns: ["disabled_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      department: {
        Row: {
          company_id: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_disabled: boolean
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_disabled?: boolean
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "department_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "department_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "department_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      employee: {
        Row: {
          address: string | null
          birth_date: string | null
          company_id: string
          created_at: string | null
          created_by: string | null
          criminal_record: string | null
          disabled_at: string | null
          disabled_by: string | null
          dpi_copy: string | null
          email: string | null
          first_name: string
          hire_date: string
          id: string
          is_disabled: boolean
          last_name: string
          phone: string | null
          photo_url: string | null
          police_record: string | null
          termination_date: string | null
          title_photostatic: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          company_id: string
          created_at?: string | null
          created_by?: string | null
          criminal_record?: string | null
          disabled_at?: string | null
          disabled_by?: string | null
          dpi_copy?: string | null
          email?: string | null
          first_name: string
          hire_date: string
          id?: string
          is_disabled?: boolean
          last_name: string
          phone?: string | null
          photo_url?: string | null
          police_record?: string | null
          termination_date?: string | null
          title_photostatic?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          criminal_record?: string | null
          disabled_at?: string | null
          disabled_by?: string | null
          dpi_copy?: string | null
          email?: string | null
          first_name?: string
          hire_date?: string
          id?: string
          is_disabled?: boolean
          last_name?: string
          phone?: string | null
          photo_url?: string | null
          police_record?: string | null
          termination_date?: string | null
          title_photostatic?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_disabled_by_fkey"
            columns: ["disabled_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      employee_job: {
        Row: {
          company_id: string
          created_at: string | null
          created_by: string | null
          current_salary: number | null
          employee_id: string
          end_date: string | null
          id: string
          is_current_job: boolean
          is_disabled: boolean
          job_id: string
          start_date: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          created_by?: string | null
          current_salary?: number | null
          employee_id: string
          end_date?: string | null
          id?: string
          is_current_job?: boolean
          is_disabled?: boolean
          job_id: string
          start_date: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          current_salary?: number | null
          employee_id?: string
          end_date?: string | null
          id?: string
          is_current_job?: boolean
          is_disabled?: boolean
          job_id?: string
          start_date?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_job_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_job_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_job_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_job_job_id_fkey"
            columns: ["job_id"]
            referencedRelation: "job"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_job_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      job: {
        Row: {
          base_salary: number | null
          company_id: string
          created_at: string | null
          created_by: string | null
          department_id: string
          description: string | null
          id: string
          is_disabled: boolean
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          base_salary?: number | null
          company_id: string
          created_at?: string | null
          created_by?: string | null
          department_id: string
          description?: string | null
          id?: string
          is_disabled?: boolean
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          base_salary?: number | null
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          department_id?: string
          description?: string | null
          id?: string
          is_disabled?: boolean
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_department_id_fkey"
            columns: ["department_id"]
            referencedRelation: "department"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      overtime: {
        Row: {
          company_id: string
          created_at: string | null
          created_by: string | null
          date: string
          employee_id: string
          id: string
          is_disabled: boolean
          quantity: number
          type: Database["public"]["Enums"]["overtime_type"]
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          created_by?: string | null
          date: string
          employee_id: string
          id?: string
          is_disabled?: boolean
          quantity: number
          type: Database["public"]["Enums"]["overtime_type"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          date?: string
          employee_id?: string
          id?: string
          is_disabled?: boolean
          quantity?: number
          type?: Database["public"]["Enums"]["overtime_type"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "overtime_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "overtime_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "overtime_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "overtime_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      payroll: {
        Row: {
          company_id: string
          created_at: string | null
          created_by: string | null
          disabled_at: string | null
          disabled_by: string | null
          id: string
          is_closed: boolean
          is_disabled: boolean
          payroll_data: Json
          payroll_date: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          created_by?: string | null
          disabled_at?: string | null
          disabled_by?: string | null
          id?: string
          is_closed?: boolean
          is_disabled?: boolean
          payroll_data: Json
          payroll_date: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          disabled_at?: string | null
          disabled_by?: string | null
          id?: string
          is_closed?: boolean
          is_disabled?: boolean
          payroll_data?: Json
          payroll_date?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payroll_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_disabled_by_fkey"
            columns: ["disabled_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      raise: {
        Row: {
          company_id: string
          created_at: string | null
          created_by: string | null
          description: string | null
          employee_job_id: string
          id: string
          is_disabled: boolean
          raise_amount: number | null
          raise_date: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          employee_job_id: string
          id?: string
          is_disabled?: boolean
          raise_amount?: number | null
          raise_date: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          employee_job_id?: string
          id?: string
          is_disabled?: boolean
          raise_amount?: number | null
          raise_date?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raise_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raise_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raise_employee_job_id_fkey"
            columns: ["employee_job_id"]
            referencedRelation: "employee_job"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raise_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      spouse: {
        Row: {
          company_id: string
          created_at: string | null
          created_by: string | null
          disabled_at: string | null
          disabled_by: string | null
          employee_id: string
          first_name: string
          id: string
          is_disabled: boolean
          last_name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          created_by?: string | null
          disabled_at?: string | null
          disabled_by?: string | null
          employee_id: string
          first_name: string
          id?: string
          is_disabled?: boolean
          last_name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          disabled_at?: string | null
          disabled_by?: string | null
          employee_id?: string
          first_name?: string
          id?: string
          is_disabled?: boolean
          last_name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "spouse_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spouse_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spouse_disabled_by_fkey"
            columns: ["disabled_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spouse_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spouse_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      work_absences: {
        Row: {
          absence_date: string
          company_id: string
          created_at: string | null
          created_by: string | null
          employee_id: string
          id: string
          is_approved: boolean
          is_disabled: boolean
          is_with_pay: boolean
          request_url: string | null
          type: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          absence_date: string
          company_id: string
          created_at?: string | null
          created_by?: string | null
          employee_id: string
          id?: string
          is_approved?: boolean
          is_disabled?: boolean
          is_with_pay?: boolean
          request_url?: string | null
          type: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          absence_date?: string
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          employee_id?: string
          id?: string
          is_approved?: boolean
          is_disabled?: boolean
          is_with_pay?: boolean
          request_url?: string | null
          type?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_absences_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_absences_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_absences_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_absences_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_monthly_payroll: {
        Args: {
          p_employee_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: {
          full_name: string
          base_salary: number
          days_worked: number
          absences: number
          absences_discount: number
          igss_discount: number
          simple_overtime_count: number
          simple_overtime_total: number
          double_overtime_count: number
          double_overtime_total: number
          total_liquid: number
        }[]
      }
      get_current_company_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      monthly_discount_for_absences: {
        Args: {
          p_employee_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: number
      }
      monthly_double_overtime: {
        Args: {
          p_employee_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: number
      }
      monthly_double_overtime_count: {
        Args: {
          p_employee_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: number
      }
      monthly_simple_overtime: {
        Args: {
          p_employee_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: number
      }
      monthly_simple_overtime_count: {
        Args: {
          p_employee_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: number
      }
      monthly_unpaid_absence_count: {
        Args: {
          p_employee_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: number
      }
    }
    Enums: {
      overtime_type: "SIMPLE" | "DOUBLE"
      user_type: "USER" | "ADMIN" | "SUPER_ADMIN"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

