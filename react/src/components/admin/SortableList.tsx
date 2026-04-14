import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box, IconButton, Paper } from '@mui/material'
import { GripVertical } from 'lucide-react'
import type { ReactNode } from 'react'

interface SortableListProps<T extends { id: number }> {
  items: T[]
  onReorder: (items: T[]) => void
  renderItem: (item: T) => ReactNode
}

export function SortableList<T extends { id: number }>({
  items,
  onReorder,
  renderItem,
}: SortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  )

  const handleEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return
    onReorder(arrayMove(items, oldIndex, newIndex))
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {items.map((item) => (
            <SortableRow key={item.id} id={item.id}>
              {renderItem(item)}
            </SortableRow>
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  )
}

function SortableRow({
  id,
  children,
}: {
  id: number
  children: ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })
  return (
    <Paper
      ref={setNodeRef}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        p: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          size="small"
          {...attributes}
          {...listeners}
          sx={{ cursor: 'grab' }}
        >
          <GripVertical size={18} />
        </IconButton>
        <Box sx={{ flex: 1 }}>{children}</Box>
      </Box>
    </Paper>
  )
}
