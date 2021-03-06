import React from 'react'
import { NavProvider, NavLoading, NavNotFoundBoundary, NavContentSegment } from 'react-navi'
import BusyIndicator from 'react-busy-indicator'
import Prism from 'prismjs'
import { DocumentProvider } from '@frontarm/document'

const languages = {
  'jsx': 'jsx',
  'js': 'jsx',
  'html': 'markup',
  'css': 'css',
}
const grammars = {
  'jsx': 'javascript',
  'html': 'html',
  'css': 'css',
}

export class App extends React.Component {
  render() {
    return (
      <DocumentProvider components={{
        Demoboard: ({ id, style, sources }) => {
          let filename = Object.keys(sources)[0]
          let extension = filename.split('.').reverse()[0]
          let language = languages[extension]

          return (
            <pre className={'language-'+language}>
              <code
                id={id}
                style={style}
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(sources[filename], Prism.languages[grammars[language]], language)
                }}
              />
            </pre>
          )
        }
      }}>
        <NavProvider navigation={this.props.navigation}>
          <NavLoading>
            {isLoading =>
              <>
                <BusyIndicator isBusy={isLoading} />
                <NavNotFoundBoundary render={() => <h1>Not Found</h1>}>
                  <NavContentSegment />
                </NavNotFoundBoundary>
              </>
            }
          </NavLoading>
        </NavProvider>
      </DocumentProvider>
    )
  }
}
