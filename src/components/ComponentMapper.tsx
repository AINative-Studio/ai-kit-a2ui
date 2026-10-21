/**
 * ComponentMapper
 * Maps A2UI component types to React components
 */

import { memo, useState } from 'react'
import type { A2UIComponent } from '@ainative/ai-kit-a2ui-core/types'
import { JSONPointer } from '@ainative/ai-kit-a2ui-core/json-pointer'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Slider } from './ui/slider'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'
import { Button } from './ui/button'
import { format, parseISO } from 'date-fns'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { AspectRatio } from './ui/aspect-ratio'
import { resolveIcon } from '../lib/icon-map'

export interface ComponentMapperProps {
  /** The A2UI component to render */
  component: A2UIComponent
  /**
   * All components in the current surface, keyed by id. A2UI's protocol
   * represents the component tree as a flat list with id-based references
   * (`component.children: string[]`), not nested objects — this lookup is
   * how a component resolves its children's real definitions.
   */
  componentsById: Record<string, A2UIComponent>
  /** The current data model for data binding */
  dataModel: Record<string, unknown>
  /** Callback when user performs an action */
  onAction: (action: string, context: Record<string, unknown>) => void
}

/**
 * Maps A2UI components to their React implementations
 *
 * Supports data binding via JSON Pointers and recursive rendering of children.
 *
 * @example
 * ```tsx
 * const components = {
 *   'root-1': { id: 'root-1', type: 'text', properties: { value: '/user/name' } },
 * }
 * <ComponentMapper
 *   component={components['root-1']}
 *   componentsById={components}
 *   dataModel={{ user: { name: 'John' } }}
 *   onAction={(action, ctx) => console.log(action)}
 * />
 * ```
 */
export const ComponentMapper = memo(function ComponentMapper({
  component,
  componentsById,
  dataModel,
  onAction,
}: ComponentMapperProps) {
  /**
   * Resolves a value from the data model using JSON Pointer
   * Falls back to literal value if pointer doesn't exist
   */
  const resolveValue = (value: unknown): unknown => {
    if (typeof value !== 'string') return value

    // Check if it's a JSON Pointer (starts with /)
    if (value.startsWith('/')) {
      const resolved = JSONPointer.resolve(dataModel, value)
      // If resolution fails, return the literal value
      return resolved !== undefined ? resolved : value
    }

    return value
  }

  /**
   * Resolves this component's children ids to their real component
   * definitions. Unknown ids (not present in componentsById) are skipped
   * rather than crashing the render.
   */
  const resolveChildren = (): A2UIComponent[] => {
    if (!component.children || component.children.length === 0) {
      return []
    }

    return component.children
      .map((childId) => componentsById[childId])
      .filter((child): child is A2UIComponent => child !== undefined)
  }

  /**
   * Renders children recursively
   */
  const renderChildren = () => {
    const children = resolveChildren()
    if (children.length === 0) {
      return null
    }

    return children.map((child) => (
      <ComponentMapper
        key={child.id}
        component={child}
        componentsById={componentsById}
        dataModel={dataModel}
        onAction={onAction}
      />
    ))
  }

  // Text component
  if (component.type === 'text') {
    const value = resolveValue(component.properties?.['value'])
    return <div>{String(value || '')}</div>
  }

  // Heading component
  if (component.type === 'heading') {
    const value = resolveValue(component.properties?.['value'])
    const level = Number(component.properties?.['level'] || 1)
    const Tag = `h${level}` as keyof JSX.IntrinsicElements

    return <Tag>{String(value || '')}</Tag>
  }

  // Button component
  if (component.type === 'button') {
    const handleClick = () => {
      const action = component.properties?.['action']
      onAction(String(action || 'click'), { componentId: component.id })
    }

    const label = resolveValue(component.properties?.['label'])
    return <button onClick={handleClick}>{String(label || 'Button')}</button>
  }

  // Container component
  if (component.type === 'container') {
    return <div className="a2ui-container">{renderChildren()}</div>
  }

  // Divider component
  if (component.type === 'divider') {
    return <hr role="separator" />
  }

  // CheckBox component
  if (component.type === 'checkbox') {
    const label = String(resolveValue(component.properties?.['label']) || '')
    const initialChecked = Boolean(resolveValue(component.properties?.['checked']))
    const disabled = Boolean(component.properties?.['disabled'])
    const required = Boolean(component.properties?.['required'])
    const action = component.properties?.['action']

    const [checked, setChecked] = useState(initialChecked)

    const handleCheckedChange = (newChecked: boolean) => {
      setChecked(newChecked)

      if (action) {
        onAction(String(action), {
          componentId: component.id,
          checked: newChecked,
        })
      }
    }

    return (
      <div className="a2ui-checkbox flex items-center space-x-2">
        <Checkbox
          id={component.id}
          checked={checked}
          onCheckedChange={handleCheckedChange}
          disabled={disabled}
          required={required}
        />
        <Label htmlFor={component.id}>{label}</Label>
      </div>
    )
  }

  // ChoicePicker component (Select dropdown)
  if (component.type === 'choicepicker') {
    const label = String(resolveValue(component.properties?.['label']) || '')
    const placeholder = String(component.properties?.['placeholder'] || 'Select...')
    const initialValue = String(resolveValue(component.properties?.['value']) || '')
    const disabled = Boolean(component.properties?.['disabled'])
    const required = Boolean(component.properties?.['required'])
    const action = component.properties?.['action']

    const optionsValue = component.properties?.['options']
    const options = (
      Array.isArray(optionsValue) ? optionsValue : resolveValue(optionsValue)
    ) as Array<{ value: string; label: string }> | undefined

    const [value, setValue] = useState(initialValue)

    const handleValueChange = (newValue: string) => {
      setValue(newValue)

      if (action) {
        onAction(String(action), {
          componentId: component.id,
          value: newValue,
        })
      }
    }

    return (
      <div className="a2ui-choicepicker space-y-2">
        <Label htmlFor={component.id}>{label}</Label>
        <Select
          value={value}
          onValueChange={handleValueChange}
          disabled={disabled}
          required={required}
        >
          <SelectTrigger id={component.id}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  // List component
  if (component.type === 'list') {
    const itemsValue = component.properties?.['items']
    const items = (
      Array.isArray(itemsValue)
        ? itemsValue
        : resolveValue(itemsValue)
    ) as Array<{ id: string; label: string; description?: string }> | undefined

    const clickable = component.properties?.['clickable'] !== false
    const ordered = Boolean(component.properties?.['ordered'])
    const dividers = Boolean(component.properties?.['dividers'])
    const action = component.properties?.['action']

    const handleItemClick = (itemId: string) => {
      if (action && clickable) {
        onAction(String(action), {
          componentId: component.id,
          itemId,
        })
      }
    }

    if (!items || items.length === 0) {
      return <div className="a2ui-list" />
    }

    const ListTag = ordered ? 'ol' : 'ul'

    return (
      <ListTag className="a2ui-list space-y-1">
        {items.map((item, index) => (
          <li key={item.id}>
            {clickable ? (
              <button
                className="w-full text-left p-2 hover:bg-accent rounded-md"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                )}
              </button>
            ) : (
              <div className="p-2">
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                )}
              </div>
            )}
            {dividers && index < items.length - 1 && <hr role="separator" className="my-1" />}
          </li>
        ))}
      </ListTag>
    )
  }

  // Tabs component
  if (component.type === 'tabs') {
    const defaultValue = String(
      resolveValue(component.properties?.['defaultValue']) || ''
    )
    const action = component.properties?.['action']
    const tabs = component.properties?.['tabs'] as
      | Array<{ value: string; label: string; content?: string }>
      | undefined

    const handleValueChange = (newValue: string) => {
      if (action) {
        onAction(String(action), {
          componentId: component.id,
          value: newValue,
        })
      }
    }

    // Simple mode: tabs defined in properties
    if (tabs && tabs.length > 0) {
      return (
        <Tabs
          defaultValue={defaultValue || tabs[0]?.value || ''}
          onValueChange={handleValueChange}
          className="a2ui-tabs"
        >
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content || ''}
            </TabsContent>
          ))}
        </Tabs>
      )
    }

    // Children mode: tabs defined as child components
    if (component.children && component.children.length > 0) {
      const tabChildren = resolveChildren()
      const triggers = tabChildren.filter((c) => c.type === 'tab-trigger')
      const contents = tabChildren.filter((c) => c.type === 'tab-content')

      return (
        <Tabs
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          className="a2ui-tabs"
        >
          <TabsList>
            {triggers.map((trigger) => (
              <TabsTrigger
                key={trigger.id}
                value={String(trigger.properties?.['value'] || '')}
              >
                {String(trigger.properties?.['label'] || '')}
              </TabsTrigger>
            ))}
          </TabsList>
          {contents.map((content) => {
            const contentChildIds = content.children || []
            const contentChildren = contentChildIds
              .map((id) => componentsById[id])
              .filter((c): c is A2UIComponent => c !== undefined)

            return (
              <TabsContent
                key={content.id}
                value={String(content.properties?.['value'] || '')}
              >
                {contentChildren.map((child) => (
                  <ComponentMapper
                    key={child.id}
                    component={child}
                    componentsById={componentsById}
                    dataModel={dataModel}
                    onAction={onAction}
                  />
                ))}
              </TabsContent>
            )
          })}
        </Tabs>
      )
    }

    return <div className="a2ui-tabs">[Empty tabs]</div>
  }

  // Slider component
  if (component.type === 'slider') {
    const label = String(resolveValue(component.properties?.['label']) || '')
    const initialValue = Number(resolveValue(component.properties?.['value']) || 0)
    const min = Number(component.properties?.['min'] || 0)
    const max = Number(component.properties?.['max'] || 100)
    const step = Number(component.properties?.['step'] || 1)
    const disabled = Boolean(component.properties?.['disabled'])
    const showValue = Boolean(component.properties?.['showValue'])
    const action = component.properties?.['action']

    const [value, setValue] = useState([initialValue])

    const handleValueChange = (newValue: number[]) => {
      setValue(newValue)

      if (action) {
        onAction(String(action), {
          componentId: component.id,
          value: newValue[0],
        })
      }
    }

    return (
      <div className="a2ui-slider space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={component.id}>{label}</Label>
          {showValue && <span className="text-sm text-muted-foreground">{value[0]}</span>}
        </div>
        <Slider
          id={component.id}
          value={value}
          onValueChange={handleValueChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
      </div>
    )
  }

  // TextField component (Input + Label)
  if (component.type === 'textfield') {
    const label = String(resolveValue(component.properties?.['label']) || '')
    const initialValue = String(resolveValue(component.properties?.['value']) || '')
    const placeholder = String(component.properties?.['placeholder'] || '')
    const inputType = String(component.properties?.['inputType'] || 'text')
    const disabled = Boolean(component.properties?.['disabled'])
    const required = Boolean(component.properties?.['required'])
    const action = component.properties?.['action']

    const [value, setValue] = useState(initialValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)

      if (action) {
        onAction(String(action), {
          componentId: component.id,
          value: newValue,
        })
      }
    }

    const handleBlur = () => {
      if (action) {
        onAction(String(action), {
          componentId: component.id,
          value,
        })
      }
    }

    return (
      <div className="a2ui-textfield">
        <Label htmlFor={component.id}>{label}</Label>
        <Input
          id={component.id}
          type={inputType}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    )
  }

  // Modal component (Dialog)
  if (component.type === 'modal') {
    const initialOpen = Boolean(resolveValue(component.properties?.['open']))
    const action = component.properties?.['action']

    const [open, setOpen] = useState(initialOpen)

    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen)

      if (action) {
        onAction(String(action), {
          componentId: component.id,
          open: newOpen,
        })
      }
    }

    const children = resolveChildren()
    const titleIndex = children.findIndex((child) => child.type === 'text')
    const titleChild = titleIndex >= 0 ? children[titleIndex] : undefined
    const titleValue = titleChild
      ? String(resolveValue(titleChild.properties?.['value']) || '')
      : undefined
    const bodyChildren = titleIndex >= 0 ? children.filter((_, i) => i !== titleIndex) : children

    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          {titleValue !== undefined && (
            <DialogHeader>
              <DialogTitle>{titleValue}</DialogTitle>
            </DialogHeader>
          )}
          {bodyChildren.map((child) => (
            <ComponentMapper
              key={child.id}
              component={child}
              componentsById={componentsById}
              dataModel={dataModel}
              onAction={onAction}
            />
          ))}
        </DialogContent>
      </Dialog>
    )
  }

  // DateTimeInput component (Popover + Calendar)
  if (component.type === 'dateTimeInput') {
    const label = String(resolveValue(component.properties?.['label']) || '')
    const placeholder = String(component.properties?.['placeholder'] || 'Pick a date')
    const initialValueRaw = resolveValue(component.properties?.['value'])
    const initialValue =
      typeof initialValueRaw === 'string' && initialValueRaw ? parseISO(initialValueRaw) : undefined
    const disabled = Boolean(component.properties?.['disabled'])
    const action = component.properties?.['action']

    const [date, setDate] = useState<Date | undefined>(initialValue)
    const [popoverOpen, setPopoverOpen] = useState(false)

    const handleSelect = (newDate: Date | undefined) => {
      setDate(newDate)
      setPopoverOpen(false)

      if (action && newDate) {
        onAction(String(action), {
          componentId: component.id,
          value: newDate.toISOString(),
        })
      }
    }

    return (
      <div className="a2ui-datetimeinput">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              id={component.id}
              variant="outline"
              disabled={disabled}
              aria-label={label}
            >
              {date ? format(date, 'MMMM do, yyyy') : placeholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              defaultMonth={date}
              onSelect={handleSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  // Image component
  if (component.type === 'image') {
    const src = String(resolveValue(component.properties?.['src']) || '')
    const alt = String(resolveValue(component.properties?.['alt']) || '')
    const circular = Boolean(component.properties?.['circular'])

    if (circular) {
      return (
        <Avatar>
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>{alt.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )
    }

    return <img src={src} alt={alt} className="a2ui-image" />
  }

  // Video component
  if (component.type === 'video') {
    const src = String(resolveValue(component.properties?.['src']) || '')
    const poster = component.properties?.['poster']
      ? String(resolveValue(component.properties['poster']))
      : undefined
    const ratio = Number(component.properties?.['aspectRatio'] || 16 / 9)

    return (
      <AspectRatio ratio={ratio} className="a2ui-video">
        <video src={src} poster={poster} controls className="h-full w-full rounded-md" />
      </AspectRatio>
    )
  }

  // AudioPlayer component
  if (component.type === 'audioPlayer') {
    const src = String(resolveValue(component.properties?.['src']) || '')
    const title = component.properties?.['title']
      ? String(resolveValue(component.properties['title']))
      : undefined

    return (
      <div className="a2ui-audioplayer space-y-1">
        {title && <p className="text-sm font-medium">{title}</p>}
        <audio src={src} controls className="w-full" />
      </div>
    )
  }

  // Icon component
  if (component.type === 'icon') {
    const name = String(component.properties?.['name'] || '')
    const action = component.properties?.['action']
    const IconComp = resolveIcon(name)

    if (action) {
      return (
        <button
          type="button"
          className="a2ui-icon inline-flex items-center justify-center"
          onClick={() => onAction(String(action), { componentId: component.id })}
          aria-label={name}
        >
          <IconComp />
        </button>
      )
    }

    return (
      <span className="a2ui-icon inline-flex items-center justify-center" aria-hidden="true">
        <IconComp />
      </span>
    )
  }

  // Fallback for unsupported components
  return <div data-component-type={component.type}>[{component.type}]</div>
})
