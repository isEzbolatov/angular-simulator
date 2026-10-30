import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-homework-28-child',
  standalone: true,
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  @Input() user!: { name: string; age: number };
}
