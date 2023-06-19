import React from 'react'
import PropTypes from 'prop-types'
import ReactFlow, { applyEdgeChanges, applyNodeChanges } from 'reactflow'
import 'reactflow/dist/style.css'

const CampaignsOverview = ({
  initialNodes,
  nodeTypes,
  initialEdges,
  defaultEdgeOptions,
}) => {
  const [nodes, setNodes] = React.useState(initialNodes)
  const [edges, setEdges] = React.useState(initialEdges)

  const onConnect = (params) => {
    // eslint-disable-next-line
    console.log(`Connected node ${params.source} with node ${params.target}`)

    setEdges((edges) => {
      const updatedEdges = edges.map((edge) => {
        return edge.target === params.target ? { ...edge, style: { ...defaultEdgeOptions.style, opacity: 1 } } : edge
      })
      return updatedEdges
    })

    setNodes((nodes) => {
      const updatedNodes = nodes.map((node) => {
        return node.id === params.target ? { ...node, data: { ...node.data, isActive: true } } : node
      })
      return updatedNodes
    })
  }

  const onNodesChange = React.useCallback((changes) => {
    return setNodes((nds) => applyNodeChanges(changes, nds))
  }, [setNodes])

  const onEdgesChange = React.useCallback((changes) => {
    return setEdges((eds) => applyEdgeChanges(changes, eds))
  }, [setEdges])

  const onNodeClick = (_, node) => {
    // eslint-disable-next-line
    console.log(`Clicked on node ${node.id}`)
  }

  const onEdgeClick = (_, edge) => {
    // eslint-disable-next-line
    console.log(`Clicked on edge ${edge.id}`)
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      defaultEdgeOptions={defaultEdgeOptions}
      onNodeClick={onNodeClick}
      onNodesChange={onNodesChange}
      onEdgeClick={onEdgeClick}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      nodesDraggable={false}
      selectNodesOnDrag={false}
      zoomOnScroll={false}
      zoomOnDoubleClick={false}
      elementsSelectable={false}
      disableKeyboardA11y
      panOnScroll
      className="flex-1"
    />
  )
}

CampaignsOverview.propTypes = {
  initialNodes: PropTypes.array.isRequired,
  nodeTypes: PropTypes.object.isRequired,
  initialEdges: PropTypes.array.isRequired,
  defaultEdgeOptions: PropTypes.object.isRequired,
}

export default CampaignsOverview
