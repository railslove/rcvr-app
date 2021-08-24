import * as React from 'react'
import Link, { LinkHref } from '~ui/core/Link/Link'
import styled from '@emotion/styled'
import { css } from '@styled-system/css'

type TableProps = JSX.IntrinsicElements['table']
const StyledTable = styled('table')(
  css({
    bg: 'white',
    width: '100%',
    boxShadow:
      '0px 1px 3px 0px rgba(0,0,0,0.1) , 0px 1px 2px 0px rgba(0,0,0,0.06)',
    borderColor: 'bluegrey.300',
    textAlign: 'left',
    fontSize: 'sm',

    th: {
      px: 2,
      py: 3,
      borderBottom: '2px solid',
      borderColor: 'bluegrey.50',
      fontWeight: 'bold',
      verticalAlign: 'middle',
    },
    td: {
      px: 2,
      py: 3,
      verticalAlign: 'middle',
    },
    'td:first-of-type, th:first-of-type': {
      pl: 4,
    },
    'td:last-of-type, th:last-of-type': {
      pr: 4,
    },
    'tr:not(:last-of-type) td': {
      borderBottom: '1px solid',
      borderColor: 'bluegrey.50',
    },

    tr: {
      transition: 'all 170ms',
    },
    'tbody tr:hover': {
      bg: 'bluegrey.10',
    },

    'tfoot td': {
      borderTop: '2px solid',
      borderColor: 'bluegrey.50',
    },
  })
)

StyledTable.defaultProps = {
  cellPadding: 0,
  cellSpacing: 0,
}

interface TableLinkProps {
  children: React.ReactNode
  as?: string
  href: LinkHref
}
const TableLink: React.FC<TableLinkProps> = ({ children, ...rest }) => {
  return (
    <Link {...rest} passHref>
      <a
        css={css({
          display: 'block',
          width: '100%',
          height: '100%',
          my: -3,
          py: 3,
        })}
      >
        {children}
      </a>
    </Link>
  )
}

type TableComponent = React.FC<TableProps> & {
  Link: React.FC<TableLinkProps>
}

export const Table: TableComponent = (props) => {
  return <StyledTable {...props} />
}

Table.Link = TableLink
