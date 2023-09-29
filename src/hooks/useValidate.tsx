import { useState } from 'react'

interface IValidationError {
  field: string;
  message: string;
}

export function useValidation<ErrorType extends Record<string, string>>() {
  const [errors, setErrors] = useState<ErrorType>({} as ErrorType)
  const [loading, setLoading] = useState<boolean>(false)

  function validateResponse<T extends Record<string, string>>(data: unknown): T {
    if (!data || !Array.isArray(data)) return {} as T

    const tempErrors: Record<string, string> = {}

    data.forEach((element: IValidationError) => {
      tempErrors[element?.field] = element?.message
    })

    return tempErrors as T
  }

  function validateAllResponse(
    errors: unknown,
    errorsMessage?: string
  ) {
    const tempErrors: ErrorType = validateResponse<ErrorType>(errors)
    setErrors(tempErrors as ErrorType)
    setLoading(false)

    return errorsMessage
  }

  return { errors, loading, setErrors, setLoading, validateAllResponse }
}
