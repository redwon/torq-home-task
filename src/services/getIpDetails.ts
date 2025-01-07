import { LRUCache } from 'lru-cache'
import { apiClient } from '../utils/apiClient'

type IpLookupRawResponse = {
  ip: string
  country_name: string
  country_code: string
  timezone: string
  error?: boolean
  reason?: string
}

type IpLookupResponse = {
  ip: string
  countryName: string
  countryCode: string
  timezone: string
  error?: string
}

function transformResponse(response: IpLookupRawResponse): IpLookupResponse {
  const data: IpLookupResponse = {
    ip: response.ip,
    countryName: response.country_name,
    countryCode: response.country_code,
    timezone: response.timezone,
  }

  if (response.error) {
    data.error = response.reason || 'Failed to lookup IP'
  }

  return data
}

// Create cache instance with maximum 50 entries
const ipCache = new LRUCache<string, IpLookupResponse>({
  max: 50,
})

export const getIpDetails = async (ip: string): Promise<IpLookupResponse> => {
  // Check cache first
  const cachedResult = ipCache.get(ip)

  if (cachedResult) {
    return cachedResult
  }

  // If not in cache, make API call
  try {
    const response = await apiClient.get<IpLookupRawResponse>(`https://ipapi.co/${ip}/json/`)
    const data = transformResponse(response.data)

    // Add to cache only successful response
    ipCache.set(ip, data)

    return data
  } catch (error) {
    return {
      ip,
      countryName: '',
      countryCode: '',
      timezone: '',
      error: error instanceof Error ? error.message : 'Network error: Failed to lookup IP',
    }
  }
}
