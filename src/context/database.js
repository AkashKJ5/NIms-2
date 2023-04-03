import React from 'react'
import initializeDb from '../rxdb/database/initialize-db'

/**
 * Database context
 */
export const DatabaseContext = React.createContext()

/**
 * Database hook
 *
 * @returns database
 */
export const useDatabase = () => React.useContext(DatabaseContext)

/**
 * Database Provider component
 *
 * Connects to the database and provides access to it
 * for all nested children via db context.
 *
 * @component
 */
export const DbProvider = ({ children }) => {
  const [database, setDatabase] = React.useState()

  // database connection
  const initDB = async () => {
    setDatabase(null)

    const [err, db] = await initializeDb()
    console.log('database error: ', err)
    setDatabase(db)
  }

  React.useEffect(() => {
    initDB()
    return () => {
      setDatabase()
    }
  }, [])

  if (database) {
    return (
      <DatabaseContext.Provider value={database} testID='app-db-loaded'>
        {children}
      </DatabaseContext.Provider>
    )
  }
}
